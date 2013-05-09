window.addEventListener('load', initialisation, false);

/**
* Fonction globale qui initialise les listeners une fois le DOM chargé.
*/
function initialisation()
{
	idChampErreur = 'errorMessage';
	idChampMessageOk = 'submitMessage';
	idSubmitButton = "submit";
	inscriptionEvenements();
}

function inscriptionEvenements()
{
	with(document)
	{
		getElementById('surname').addEventListener('blur', verifieChaineVide, false);
		getElementById('name').addEventListener('blur', verifieChaineVide, false);
		getElementById('email').addEventListener('blur', verifieEmail, false);
		getElementById(idSubmitButton).addEventListener('click', soumissionFormulaire, false);
		getElementById('age').addEventListener('blur', verifieAgeValide, false);
	}			
}

/**
* Verifie les champs textes du formulaire afin qu'ils soient obligatoirement renseignés.
*/
function verifieChaineVide(event, idChamp)
{
	if(typeof(idChamp)=='undefined')
		idChamp = event.target.id;
		
	var bool = true;
	var valeurChamp = document.getElementById(idChamp).value;
	var nomChamp = idChamp.toUpperCase();
	var messageErreur = "Veuillez renseigner le champ " + nomChamp;
	if(trim(valeurChamp).length == 0) //Erreur chaine vide
	{
		champInvalide(idChamp);
		afficherErreur(messageErreur);
		bool = false;
	}
	else //Valide
	{
		champValide(idChamp);
		afficherErreur(''); //On vide la zone d'affichage des erreurs
		document.getElementById(idChampErreur).style.display = "none";
	}
	return bool;
}

/**
* Verifie l'email du formulaire.
*/
function verifieEmail(event, idChamp)
{
	var bool = true;
	if(typeof(idChamp)=='undefined')
		var idChamp = event.target.id;
	var valeurChamp = document.getElementById(idChamp).value;
	var nomChamp = idChamp.toUpperCase();
	var messageErreur = "Veuillez renseigner le champ " + nomChamp;
	if(checkEmail(valeurChamp)) //Email valide
	{
		champValide(idChamp);
		afficherErreur(''); //On vide la zone d'affichage des erreurs
		document.getElementById(idChampErreur).style.display = "none";
	}
	else //Invalide
	{
		champInvalide(idChamp);
		afficherErreur(messageErreur);
		bool = false;
	}
	return bool;
}

/**
* Verifie la validité de l'age saisi dans le formulaire.
*/
function verifieAgeValide(event, idChamp)
{
	var bool = true;
	if(typeof(idChamp)=='undefined')
		var idChamp = event.target.id;
	var valeurChamp = document.getElementById(idChamp).value;
	var messageErreur = "L'âge doit être compris entre 0 et 999 !";
	if(is_int(valeurChamp) && valeurChamp != '')
	{
		if(valeurChamp <= 0 || valeurChamp > 999) //Non valide
		{
			champInvalide(idChamp);
			afficherErreur(messageErreur);
			bool = false;
		}
		else //Valide
		{
			champValide(idChamp);
			afficherErreur('');
			document.getElementById(idChampErreur).style.display = "none";
		}
	}
	else //Non valide
	{
		champInvalide(idChamp);
		afficherErreur("L'âge doit être un entier !");
		bool = false;
	}
	return bool;
}

/**
* Verifie l'email du formulaire.
*/
function soumissionFormulaire(event)
{
	var idChamp = event.target.id;
	if(idChamp == idSubmitButton)
	{
		//Refaire une verif
		var bool1 = verifieChaineVide(event, 'name');
		var bool2 = verifieChaineVide(event, 'surname');
		var bool3 = verifieEmail(event, 'email')
		var bool4 = verifieAgeValide(event, 'age');
		//Afficher "formulaire soumit"
		if(bool1 && bool2 && bool3 && bool4)
		{
			document.getElementById(idChampMessageOk).innerHTML = 'Le formulaire a été soumis avec succès !';
			document.getElementById(idChampMessageOk).style.display = "block";
		}
		else alert('Veuillez compléter les champs invalides avant de soumettre le formulaire');
	}
}

/**
* Met le champ en vert.
*/
function champValide(idChamp)
{
	//document.getElementById(idChamp).style.backgroundColor = "#57a700";
	document.getElementById(idChamp).style.borderColor = "#57a700";
}

/**
* Met le champ en rouge.
*/
function champInvalide(idChamp)
{
	//document.getElementById(idChamp).style.backgroundColor = "#E9003A";
	document.getElementById(idChamp).style.borderColor = "#E9003A";
}

/**
* Affiche un message d'erreur dans l'element d'affichage d'erreur (var globale).
*/
function afficherErreur(messageErreur)
{
	document.getElementById(idChampErreur).innerHTML = messageErreur;
	document.getElementById(idChampErreur).style.display = "block";
	document.getElementById(idChampMessageOk).style.display = "none";
}

/**
* Retourne une chaine sans les blancs de début et de fin.
*/
function trim(myString)
{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 

/**
* Permet de savoir si la valeur passé en paramètre est un entier ou non.
*/
function is_int(valeur)
{
	return !isNaN(valeur) && parseInt(valeur) == valeur;
}/*
function is_int(num)
{
	num=num.replace(',','.');
	return !(num-parseInt(num)>0);
}*/

/**
* Permet de valider une adresse email. 
*/
function checkEmail(email)
{
	var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

	if(reg.test(email))
		return true;
	else
		return false;
}



