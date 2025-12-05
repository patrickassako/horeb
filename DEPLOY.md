# Guide de Déploiement

Ce projet est prêt à être déployé sur **GitHub** et **Vercel**.

## 1. Préparation GitHub

Si ce n'est pas déjà fait :

1.  Initialisez git (déjà fait normalement) :
    ```bash
    git init
    ```
2.  Ajoutez tous les fichiers :
    ```bash
    git add .
    ```
3.  Faites le premier commit :
    ```bash
    git commit -m "Initial commit"
    ```
4.  Créez un nouveau repository sur [GitHub](https://github.com/new).
5.  Liez votre dossier local au repository distant et poussez le code (remplacez l'URL) :
    ```bash
    git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/NOM_DU_REPO.git
    git branch -M main
    git push -u origin main
    ```

## 2. Déploiement sur Vercel

1.  Allez sur [Vercel](https://vercel.com) et connectez-vous avec votre compte GitHub.
2.  Cliquez sur **"Add New..."** -> **"Project"**.
3.  Importez le repository GitHub que vous venez de créer.
4.  Dans la configuration du projet ("Configure Project") :
    *   **Framework Preset** : Vercel devrait détecter `Vite` automatiquement. Sinon, choisissez `Vite`.
    *   **Build Command** : `npm run build`
    *   **Output Directory** : `dist`
5.  **Variables d'Environnement** (TRES IMPORTANT) :
    *   Ajoutez les variables présentes dans votre fichier `.env` :
        *   `VITE_SUPABASE_URL` : (Copiez la valeur de votre .env)
        *   `VITE_SUPABASE_ANON_KEY` : (Copiez la valeur de votre .env)
6.  Cliquez sur **"Deploy"**.

## 3. Après le déploiement

*   **URL Supabase** : Assurez-vous que l'URL de votre site Vercel (ex: `https://mon-projet.vercel.app`) est ajoutée dans la liste des **"Site URL"** et **"Redirect URLs"** dans votre dashboard Supabase (Authentication -> URL Configuration).

Bravo ! Votre site est en ligne. 🚀
