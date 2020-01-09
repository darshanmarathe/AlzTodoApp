FROM mcr.microsoft.com/powershell:preview

MAINTAINER Darshan Marathe, darshanmarathe@gmail.com


#Install Chocolatey
RUN powershell.exe -Command Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Microsoft Visual C++ Redistributable for Visual Studio 2017, URLRewrite Module and SQL Server CMD Utilities (BCP)
RUN choco.exe install nodejs -y 

RUN npm install 

WORKDIR app

COPY . /app

EXPOSE 3000


CMD ["npm" , "start"]
