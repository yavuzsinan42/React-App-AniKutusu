import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import express, { response } from "express"

import User from '../db/userModel.js'
import tokenModel from "../db/tokenModel.js"

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword, firstName, lastName} = req.body

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:'Bu emaile sahip bir kullanıcı mevcut'})
        }
        if(password !== confirmPassword) {
            return res.status(400).json({message: 'Şifreler eşleşmiyor'})
        }
        const hashedPassword = await bcrypt.hash(password,10) //10 değeri güvenlik için şifreye eklenen salt'ın güçlülüğünü belirtir. büyüdükçe şifre daha güvenli hale gelir. Ancak işlem süresi artar.
        const user = await User.create({
            email,
            name: `${firstName} ${lastName}`,
            password: hashedPassword

        })

        const accessToken = jwt.sign(
            {email: user.email, id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '3m',
            }
        )
        const refreshToken = jwt.sign(
            {email: user.email, id: user._id},
            process.env.REFRESH_TOKEN_SECRET,
        )
        await tokenModel.create({
            userId: user._id,
            refreshToken: refreshToken,
        })
        res.cookie('token', refreshToken,{
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        })
        res.status(200).json({user, accessToken})
    } catch (error) {
        console.log(error);
    }

})
router.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await  User.findOne({email})
        if(!user) return res.status(404).json({message: 'Kullanıcı Bulunamadı'})

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) return res.status(404).json({message: 'Lütfen Giriş Bilgilerini Kontrol Edin'})

        const accessToken = jwt.sign(
            {email: user.email, id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '3m'}
        )

        const refreshToken = jwt.sign({email: user.email, id: user._id}, process.env.REFRESH_TOKEN_SECRET)
        await tokenModel.findOneAndUpdate(
            {userId:user._id},
            {
                refreshToken: refreshToken
            },
            {new: true}
        )
        res.cookie('token', refreshToken,{
            httpOnly: true,
            sameSite: 'strict',
            secure: true

        })

        res.status(200).json({user, accessToken})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.get('/logout/:id',async(req,res)=>{
    try {
        const {id} = req.params
        res.clearCookie('token')
        await tokenModel.findOneAndUpdate({
            userId: id
        },
        {
            refreshToken: null
        },
        {new: true})
        res.status(200).json({message: 'Başarıyla Çıkış Yapıldı'})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/refresh/:id', async(req,res)=>{
try {
    const {id} = req.params
    const {refreshToken} = await tokenModel.findOne({userId: id})
    if(!refreshToken) return res.sendStatus(401)

    const cookie = req.cookies.token
    if(!cookie) res.sendStatus(403)
    if(cookie !== refreshToken) res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefreshToken)=>{
        if(err) return res.status(403).json(err)

        const accessToken = jwt.sign({email: decodedRefreshToken.email, id: decodedRefreshToken.id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '3m'})
        res.status(200).json(accessToken)
    })
} catch (error) {
    console.log(error?.message);
}
})
export default router