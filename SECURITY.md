# Guide de Sécurité - RIAFCO

Ce document décrit les mesures de sécurité mises en place dans l'application RIAFCO pour protéger contre les attaques courantes.

## 🔒 Protections Implémentées

### 1. Protection contre les attaques XSS (Cross-Site Scripting)

#### Content Security Policy (CSP)
- **Localisation**: `index.html`
- **Configuration**: Politique stricte qui limite les sources de scripts, styles et autres ressources
- **Fonctionnalités**:
  - `default-src 'self'`: Autorise uniquement les ressources du même domaine
  - `script-src`: Limite l'exécution de scripts
  - `style-src`: Contrôle les sources de styles
  - `block-all-mixed-content`: Bloque le contenu mixte HTTP/HTTPS
  - `upgrade-insecure-requests`: Force l'utilisation de HTTPS

#### Sanitisation des entrées
- **Localisation**: `src/utils/security.js`
- **Fonctions**:
  - `sanitizeInput()`: Nettoie les entrées utilisateur pour prévenir l'injection de code
  - `sanitizeData()`: Nettoie les objets de données avant l'envoi

### 2. Protection contre les attaques CSRF (Cross-Site Request Forgery)

#### Tokens CSRF
- **Localisation**: `src/utils/security.js`, `src/services/api.js`
- **Fonctionnement**:
  - Génération de tokens CSRF aléatoires
  - Stockage sécurisé dans `sessionStorage`
  - Inclusion automatique dans les en-têtes des requêtes non-GET
  - Validation côté serveur (à implémenter)

#### Headers de sécurité
- `X-Requested-With: XMLHttpRequest`: Indique que la requête provient d'AJAX
- `X-CSRF-Token`: Token CSRF pour valider l'origine de la requête

### 3. Protection contre le Clickjacking

- **X-Frame-Options: DENY**: Empêche l'embedding de la page dans des iframes
- **Cross-Origin-Opener-Policy: same-origin**: Isole les fenêtres cross-origin

### 4. Protection contre le MIME Sniffing

- **X-Content-Type-Options: nosniff**: Empêche le navigateur de deviner le type MIME

### 5. Protection contre les attaques Spectre

- **Cross-Origin-Embedder-Policy: require-corp**: Protège contre les attaques de type Spectre
- **Cross-Origin-Resource-Policy: same-origin**: Contrôle l'accès aux ressources cross-origin

### 6. Gestion sécurisée des tokens d'authentification

#### Stockage
- **Cookies**: Utilisation de cookies avec `sameSite: 'strict'` et `secure: true` en production
- **sessionStorage**: Pour les tokens CSRF (plus sécurisé que localStorage)
- **localStorage**: Utilisé uniquement comme fallback (non recommandé pour les données sensibles)

#### Nettoyage automatique
- Suppression automatique des tokens lors des erreurs 401
- Nettoyage complet lors de la déconnexion

### 7. Validation des entrées

#### Fonctions de validation
- `isValidEmail()`: Validation des adresses email
- `validatePassword()`: Validation de la force des mots de passe
- `isValidUrl()`: Validation des URLs pour prévenir les redirections malveillantes

#### Critères de mot de passe
- Minimum 8 caractères
- Au moins une majuscule
- Au moins une minuscule
- Au moins un chiffre
- Au moins un caractère spécial

### 8. Rate Limiting côté client

- **Localisation**: `src/utils/security.js`
- **Fonction**: `checkRateLimit()`
- **Protection**: Limite le nombre de tentatives pour prévenir les attaques par force brute
- **Nettoyage automatique**: Nettoyage périodique du store de rate limiting

### 9. Protection contre les attaques de timing

- **Fonction**: `constantTimeDelay()`
- **Objectif**: Utilise un délai constant pour éviter les attaques par analyse de timing

### 10. Permissions Policy

- Désactivation des fonctionnalités sensibles:
  - Géolocalisation
  - Microphone
  - Caméra
  - Paiement
  - USB
  - Capteurs (magnétomètre, gyroscope, accéléromètre)
  - Interest Cohort (FLoC)

## 🛡️ Bonnes Pratiques à Suivre

### Pour les développeurs

1. **Ne jamais stocker de données sensibles dans localStorage**
   - Utiliser des cookies avec `httpOnly` et `secure` pour les tokens
   - Utiliser `sessionStorage` uniquement pour des données temporaires

2. **Toujours valider et nettoyer les entrées utilisateur**
   - Utiliser les fonctions de `src/utils/security.js`
   - Ne jamais faire confiance aux données côté client

3. **Utiliser HTTPS en production**
   - Tous les cookies doivent avoir l'attribut `secure`
   - Forcer HTTPS avec `upgrade-insecure-requests`

4. **Implémenter le rate limiting côté serveur**
   - Le rate limiting côté client est complémentaire, pas suffisant
   - Utiliser des solutions comme `express-rate-limit` côté backend

5. **Valider les tokens CSRF côté serveur**
   - Le frontend envoie les tokens, mais le backend doit les valider
   - Générer de nouveaux tokens après chaque requête importante

6. **Logs et monitoring**
   - Logger les tentatives d'attaque
   - Monitorer les erreurs 401, 403, et autres codes d'erreur de sécurité

### Configuration serveur recommandée

#### Headers HTTP à configurer côté serveur

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), ...
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

#### Exemple avec Express.js

```javascript
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

## ⚠️ Limitations et Notes Importantes

1. **CSP avec 'unsafe-inline' et 'unsafe-eval'**
   - Nécessaires pour React/Vite en développement
   - En production, considérer l'utilisation de nonces pour améliorer la sécurité
   - Alternative: Utiliser `Content-Security-Policy-Report-Only` pour tester

2. **Rate Limiting côté client**
   - Peut être contourné par un attaquant déterminé
   - Doit être complété par du rate limiting côté serveur

3. **Tokens CSRF**
   - La validation doit être implémentée côté serveur
   - Les tokens doivent être régénérés périodiquement

4. **Cookies**
   - Les cookies `httpOnly` ne peuvent pas être définis depuis JavaScript
   - Doivent être configurés côté serveur pour une sécurité maximale

## 🔍 Tests de Sécurité

### Tests recommandés

1. **Test XSS**
   - Essayer d'injecter `<script>alert('XSS')</script>` dans les champs de formulaire
   - Vérifier que le code n'est pas exécuté

2. **Test CSRF**
   - Tenter de faire une requête depuis un autre domaine
   - Vérifier que les tokens CSRF sont requis

3. **Test Clickjacking**
   - Essayer d'embedder la page dans un iframe
   - Vérifier que cela est bloqué

4. **Test de validation**
   - Tester avec des entrées malveillantes
   - Vérifier que les données sont correctement nettoyées

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

## 🔄 Mises à jour de Sécurité

Ce document doit être mis à jour régulièrement pour refléter:
- Les nouvelles menaces identifiées
- Les améliorations de sécurité apportées
- Les changements dans les bonnes pratiques de l'industrie

---

**Dernière mise à jour**: 2024
**Version**: 1.0

