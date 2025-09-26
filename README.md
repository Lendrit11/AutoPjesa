#  AutoPjesa

##  Përshkrimi i Projektit

**AutoPjesa** është një platformë menaxhimi për pjesë automjetesh, zhvilluar si punim akademik nga Jahir Qoqaj dhe Lendrit Zogaj. Qëllimi i saj është të ofrojë një zgjidhje efikase për menaxhimin,
kërkimin dhe organizimin e pjesëve të ndryshme të automjeteve në mënyrë intuitive dhe të shpejtë.

---

##  Funksionalitetet Kryesore

-  Krijimi, përditësimi dhe fshirja e pjesëve të automjeteve
-  Ngarkimi dhe ruajtja e fotove për secilën pjesë
-  Kategorizimi sipas prodhuesit, kategorisë dhe modelit të automjetit
-  Kërkim dhe filtrim i avancuar sipas karakteristikave
-  Autentifikim dhe autorizim për role të ndryshme (Administrator, Përdorues)
-  Menaxhim i stokut: sasia, çmimi, zbritjet dhe niveli i porositjes
-  Ndërfaqe moderne dhe responsive për përdorim në pajisje të ndryshme

---

##  Teknologjitë e Përdorura

| Teknologji         | Përdorimi                          |
|--------------------|------------------------------------|
| .NET Web API       | Backend dhe logjika e sistemit     |
| React.js           | Ndërfaqja e përdoruesit (frontend) |
| MS SQL Server      | Menaxhimi i të dhënave             |
| Bootstrap          | Stilizim dhe dizajn responsive     |

---

##  Udhëzime për Startimin e Projektit

###  Parakushtet

Sigurohuni që i keni të instaluara këto mjete:

- [.NET SDK](https://dotnet.microsoft.com/en-us/download) (versioni i fundit i rekomanduar)
- [Node.js dhe npm](https://nodejs.org/)
- [MS SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)


---
###  Klonimi i Repositorit

```bash
git clone https://github.com/username/AutoPjesa.git
cd AutoPjesa
### Konfigurimi i Bazës së të Dhënave
- Hapni SQL Server Management Studio
- Krijoni një bazë të re me emrin AutoPjesaDB
- Përditësoni string-un e lidhjes në skedarin appsettings.json në dosjen e backend-it:
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=AutoPjesaDB;Trusted_Connection=True;"
}
---
### Migrimi dhe Startimi i Backend-it (.NET Web API
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
---
 ### Startimi i Frontend-it (React.js)
cd frontend
npm install
npm run dev
```
---
### Licenca
Ky projekt është zhvilluar për qëllime akademike dhe nuk ka licencë komerciale. Nuk Mund të përdoret për mësim, demonstrim ose zgjerim personal, pa lejen e autoreve.
---
### Kontakt
Për pyetje, sugjerime ose bashkëpunim:
- Jahir Qoqaj - LinkedIn
- Lendrit Zogaj - LinkedIn

