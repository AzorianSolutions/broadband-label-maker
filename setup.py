from setuptools import setup

setup(
    name='broadband-labeler',
    version='0.1.0',
    package_dir={'': 'src'},
    install_requires=[
        'click==8.1.3',
        'django==4.1.4',
        'jinja2==3.1.2',
        'pyaml==21.10.1',
        'cryptography==39.0.0',
        'pydantic==1.10.2',
        'python-dotenv==0.21.0',
    ],
    entry_points={
        'console_scripts': [
            'bbl = lib.cli.app:cli',
        ],
    },
)
