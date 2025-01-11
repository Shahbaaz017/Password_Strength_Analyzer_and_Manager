from bson import ObjectId

class User:
    def __init__(self, name, email, hashed_vault_password, encrypted_seed_phrase, salt, authenticator_secret, _id=None):
        self._id = _id if _id else ObjectId()
        self.name = name
        self.email = email
        self.hashed_vault_password = hashed_vault_password
        self.encrypted_seed_phrase = encrypted_seed_phrase
        self.salt = salt
        self.authenticator_secret = authenticator_secret

    def to_dict(self):
        return {
            "_id": str(self._id),  # Convert ObjectId to string for JSON compatibility
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
            name=data['name'],
            email=data['email'],
            hashed_vault_password=data['hashed_vault_password'],
            encrypted_seed_phrase=data['encrypted_seed_phrase'],
            salt=data['salt'],
            authenticator_secret=data['authenticator_secret'],
            _id=ObjectId(data['_id']) if '_id' in data else None
        )
