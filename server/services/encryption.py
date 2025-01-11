from Crypto.Cipher import AES
from Crypto.Protocol.KDF import scrypt
import base64

def derive_key(password, salt):
    return scrypt(password.encode(), salt, key_len=32, N=2**14, r=8, p=1)

def encrypt(data, key):
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(data.encode())
    return base64.b64encode(cipher.nonce + tag + ciphertext).decode()

def decrypt(data, key):
    raw_data = base64.b64decode(data.encode())
    nonce, tag, ciphertext = raw_data[:16], raw_data[16:32], raw_data[32:]
    cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
    return cipher.decrypt_and_verify(ciphertext, tag).decode()
