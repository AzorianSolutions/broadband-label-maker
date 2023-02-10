from pydantic import BaseSettings


class AppSettings(BaseSettings):
    debug: bool = False
    dev_server_address: str = '0.0.0.0'
    dev_server_port: int = 8080
    secret_key: str = 'INSECURE-CHANGE-ME-DvzWvduNFYERxkfk6x22'
    config: str = 'conf/config.yml'

    class Config:
        env_prefix = 'spn_'
