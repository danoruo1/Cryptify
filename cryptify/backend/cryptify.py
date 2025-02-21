from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Random import get_random_bytes
import os

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
        elif "CFB" in mode: #Cipher Block Chaining (CBC)
            ciphertext = ""
        elif "CGB" in mode: #
            ciphertext = ""
        return ciphertext

    def decrypt(self,ciphertext,mode=None):
        if mode==None: #Defaults to Electronic Codebook(ECB)
            # Create a new AES cipher for decryption
            decipher = AES.new(self.key, AES.MODE_ECB)
            # Decrypt the data
            decrypted_data = unpad(decipher.decrypt(ciphertext), AES.block_size)
            plaintext = decrypted_data.decode()
        elif "CFB" in mode: #Cipher Block Chaining (CBC)
            plaintext = ""
        elif "CGB" in mode: #
            plaintext = ""
        return plaintext

class RSAClass():
    def __init__(self):
        pass
    # Generate RSA keys (2048 bits)
    def generate_rsa_keys():
        key = RSA.generate(2048)
        private_key = key.export_key()
        public_key = key.publickey().export_key()
        return private_key, public_key

    # Encrypt message with the public key
    def encrypt_message(message, public_key):
        public_key = RSA.import_key(public_key)
        cipher = PKCS1_OAEP.new(public_key)
        ciphertext = cipher.encrypt(message.encode('utf-8'))
        return ciphertext

    # Decrypt message with the private key
    def decrypt_message(ciphertext, private_key):
        private_key = RSA.import_key(private_key)
        cipher = PKCS1_OAEP.new(private_key)
        decrypted_message = cipher.decrypt(ciphertext)
        return decrypted_message.decode('utf-8')

class CeaserCipher():
    def __init__(self):
        pass
    def caesar_encrypt(plaintext, shift):
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