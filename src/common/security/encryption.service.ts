import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";




@Injectable()
export class EncryptionService{
private readonly algoritem = "aes-256-gcm"
private readonly key : Buffer
constructor(private readonly configservier:ConfigService){
        this.key = Buffer.from(this.configservier.getOrThrow<string>("ENCRYPTION-SECURITY"),"hex")
}

  encrypt(plainText:string):string{
    const iv  = randomBytes(12)
    const cipher = createCipheriv(
        this.algoritem,
        this.key,
        iv
    )
    const encrypt = Buffer.concat([
    cipher.update(plainText,"utf-8"),
    cipher.final()
    ])
    const authTag = cipher.getAuthTag()
    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypt.toString("hex")}`
    
  }


    decrypt(payload:string){
     const parts = payload.split(":")
     if (parts.length != 3) {
        throw new BadRequestException("invalid encrypted payload")
     }
     const[iv,authTag,encrypt] = parts.map(ele=>Buffer.from(ele,"hex"))
     try {
        const decipher = createDecipheriv(this.algoritem,this.key,iv)
        decipher.setAuthTag(authTag)
        return Buffer.concat([
            decipher.update(encrypt),
            decipher.final()
        ]).toString()
     } catch (error) {
        throw new BadRequestException("wrong key inserted")
     }


    }
}