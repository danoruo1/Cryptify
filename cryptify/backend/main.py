from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Random import get_random_bytes
from pydantic import BaseModel
from cryptography.hazmat.primitives import serialization
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import pandas as pd
import numpy as np
import base64

class AESClass():
    def __init__(self):
        pass

    def getBytes(self,data):
        encoded_string = data.encode('utf-8')
        # Get the length in bytes
        total_bytes = len(encoded_string)
        if total_bytes <= 16:
            return 16
        if total_bytes <=24:
            return 24
        return 32
    
    def encrpyt(self,data,mode=None):
        if mode==None: #Defaults to Electronic Codebook(ECB)
            self.key = os.urandom(self.getBytes(data))
            data_bytes = data.encode('utf-8')
            ciphertext = AES.new(self.key, AES.MODE_ECB)
            padded_data = pad(data_bytes, AES.block_size) 
            ciphertext = ciphertext.encrypt(padded_data)
        return ciphertext

    def decrypt(self,ciphertext,mode=None):
        if mode==None: #Defaults to Electronic Codebook(ECB)
            # Create a new AES cipher for decryption
            decipher = AES.new(self.key, AES.MODE_ECB)
            # Decrypt the data
            decrypted_data = unpad(decipher.decrypt(ciphertext), AES.block_size)
            plaintext = decrypted_data.decode()
        return plaintext

class RSAClass():
    def __init__(self):
        pass
    # Generate RSA keys (2048 bits)
    def generate_rsa_keys(self):
        key = RSA.generate(2048)
        private_key = key.export_key() 
        public_key = key.publickey().export_key() 
        return private_key, public_key


    # Encrypt message with the public key
    def encrypt_message(self, message, public_key):
        public_key = RSA.import_key(public_key)
        cipher = PKCS1_OAEP.new(public_key)

        # Encrypt the message
        ciphertext = cipher.encrypt(message.encode('utf-8'))

        # Encode the ciphertext in base64 for easier handling as a string
        ciphertext_base64 = base64.b64encode(ciphertext).decode('utf-8')

        return ciphertext_base64

    # Decrypt message with the private key
    def decrypt_message(self, ciphertext, private_key):
        private_key = RSA.import_key(private_key)
        cipher = PKCS1_OAEP.new(private_key)
        decrypted_message = cipher.decrypt(ciphertext)
        return decrypted_message.decode('utf-8')

class CeaserCipher():
    def __init__(self):
        pass
    def caesar_encrypt(self, plaintext, shift):
        encrypted_text = ''
        for char in plaintext:
            if char.isalpha():
                # Shift letter within bounds of uppercase or lowercase
                shift_base = 65 if char.isupper() else 97
                encrypted_text += chr((ord(char) - shift_base + shift) % 26 + shift_base)
            else:
                encrypted_text += char
        return encrypted_text

    def caesar_decrypt(self,ciphertext, shift):
        return self.caesar_encrypt(ciphertext, -shift)  # Decrypting is just shifting back
    
class DictionaryModel(BaseModel):
    message: str = None  # Public key for RSA
    method: str = None  # Private key for RSA
    key: dict = {} # Shift for Caesar cipher

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or use ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],  # Allow these methods
    allow_headers=["*"],
)



@app.post("/encrypt-message")
def encrypt_message(key: DictionaryModel):
    message = key.message
    method =  key.method 
    keyArr = key.key

    final_message = ""
    if "AES" in method.upper():
        aes = AESClass()
        final_message = aes.encrpyt(message)
    elif "CEASER" in method.upper():
        shift = int(keyArr["shift"])
        ceasercipher = CeaserCipher()
        final_message = ceasercipher.caesar_encrypt(message,shift)
    elif "RSA" in method.upper():
        rsaAlg = RSAClass()
        pubKey = keyArr["pubKey"]
        final_message = rsaAlg.encrypt_message(message,pubKey)
        print(final_message)
    return {"encrypted_message": final_message}

@app.get("/getRSAKEY")
def getkeyRSA():
    temp = RSAClass()
    pub,private = temp.generate_rsa_keys()
    return {"public_key": pub, "private_key": private}  # Return as a dictionary

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
