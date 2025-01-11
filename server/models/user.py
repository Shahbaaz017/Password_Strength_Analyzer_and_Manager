from bson import ObjectId

class User:
    def __init__(self, name, email, hashed_vault_password, encrypted_seed_phrase, salt, authenticator_secret):
        self.name = name
        self.email = email
        self.hashed_vault_password = hashed_vault_password
        self.encrypted_seed_phrase = encrypted_seed_phrase
        self.salt = salt
        self.authenticator_secret = authenticator_secret

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "hashed_vault_password": self.hashed_vault_password,
            "encrypted_seed_phrase": self.encrypted_seed_phrase,
            "salt": self.salt,
            "authenticator_secret": self.authenticator_secret
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            data['name'],
            data['email'],
            data['hashed_vault_password'],
            data['encrypted_seed_phrase'],
            data['salt'],
            data['authenticator_secret']
        )
