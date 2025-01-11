class Password:
    def __init__(self, user_id, password_name, encrypted_password):
        self.user_id = user_id
        self.password_name = password_name
        self.encrypted_password = encrypted_password
    
    @classmethod
    def from_dict(cls, data):
        return cls(data['user_id'], data['password_name'], data['encrypted_password'])
    
    def to_dict(self):
        return {
            "user_id": self.user_id,
            "password_name": self.password_name,
            "encrypted_password": self.encrypted_password
        }
