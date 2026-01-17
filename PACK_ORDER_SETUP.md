# 📦 Configuration de l'ordre d'affichage des packs

## 🚀 Installation

### 1. Exécuter le script SQL dans Supabase

1. Allez sur votre projet Supabase
2. Ouvrez l'éditeur SQL
3. Exécutez le contenu du fichier `supabase-add-display-order.sql` :

```sql
-- Ajouter le champ display_order à la table packs
ALTER TABLE packs ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_packs_display_order ON packs(display_order);

-- Initialiser les valeurs de display_order pour les packs existants
-- Basé sur le prix (ordre croissant)
UPDATE packs 
SET display_order = subquery.row_number
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY price ASC) as row_number
  FROM packs
) AS subquery
WHERE packs.id = subquery.id;

-- Si display_order est NULL, le mettre à 0
UPDATE packs SET display_order = 0 WHERE display_order IS NULL;
```

## 📋 Utilisation

### Dans l'admin panel :

1. Allez sur la page Admin (`/admin`)
2. Cliquez sur l'onglet **"Packs"**
3. Vous verrez maintenant :
   - Un numéro d'ordre (#1, #2, #3...) à côté de chaque pack
   - Des boutons **↑** (haut) et **↓** (bas) pour réorganiser

### Réorganiser les packs :

- Cliquez sur **↑** pour déplacer un pack vers le haut (il apparaîtra en premier)
- Cliquez sur **↓** pour déplacer un pack vers le bas (il apparaîtra en dernier)
- Les boutons sont désactivés si le pack est déjà en première ou dernière position

### Résultat :

L'ordre que vous définissez dans l'admin sera automatiquement appliqué sur la page principale dans la section "Tarifs".

## ⚙️ Fonctionnement technique

- Le champ `display_order` stocke la position d'affichage
- Les packs sont triés par `display_order` (croissant)
- Les packs sans `display_order` (NULL) apparaissent en dernier
- L'ordre est sauvegardé immédiatement dans Supabase

## 🔄 Migration des données existantes

Si vous avez déjà des packs, le script SQL initialise automatiquement leur `display_order` basé sur le prix (du moins cher au plus cher).

Vous pouvez ensuite réorganiser manuellement dans l'admin panel.
