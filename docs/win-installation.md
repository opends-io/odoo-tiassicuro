# Windows Installation process for odoo development

## Required softwares

- Python
- pip
- Postgres
- git
- Visual Studio Build Tools
- wkhtmltopdf
- VS Code

## Install virtual venv

```bash
py -m venv venv
```

## Create postgres database

Executable path: %ProgramFiles%\PostgresSQL\\[version]\\bin\\

```bash
createuser.exe --createdb --pwprompt --username=postgres odoo
```

## Clone the odoo repository

```bash
git clone https://github.com/odoo/odoo.git --depth 1 --branch 18.0 --single-branch
```

## Install dependencies

Activate environment

```bash
 .\venv\Scripts\activate
```

Deactivate environment

```bash
  deactivate
```

Install requirements

```bash
  cd odoo
```

```bash
  pip install -r .\requirements.txt
```

## Add launch file

Add the current launche config to VS Code

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python Debugger: Current File",
            "type": "debugpy",
            "request": "launch",
            "program": "${workspaceRoot}/odoo/odoo-bin",
            "args": ["-c", "${workspaceRoot}/odoo.conf", "--dev", "--test-enable"],
            "gevent": false,
            "console": "integratedTerminal",
            "justMyCode": false
        }
    ]
}
```

## Scaffold custom module

```bash
  
  python .\odoo\odoo-bin scaffold website_wgo_tiassicuro .\custom_addons\ 

```
