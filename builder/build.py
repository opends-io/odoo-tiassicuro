import os

cwd = os.getcwd()
print("Current working directory:", cwd)
filePath = os.path.join(cwd, "addons", "tiassicuro_website", "__manifest__.py")
print("File path:", filePath)
f = open(filePath, "r")

print(f.read())
f.close()
