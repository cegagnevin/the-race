Event.observe(window,'load',initialisation);

function initialisation()
{
	Event.observe($('submitLivreDOr'),'click',posterMessageLivreDOr);
}

function posterMessageLivreDOr()
{
	var bool = true;
	var author = $('pseudo').value.escapeHTML();
	var message = $('message').value.escapeHTML();
	
	//Vérification du pseudo et du message
	if(trim(author).length == 0)
	{
		bool = false;
		alert('Veuillez saisir un pseudo');
	}
	else if(trim(message).length == 0)
	{
		bool = false;
		alert('Veuillez saisir un message');
	}
	
	if(bool)
	{
		//On récupère la date courante par requete AJAX
		new Ajax.Request('../php/date.php', 
						{
							onSuccess: function(response) {
								dateCourante = response.responseText;
							}
						
		});
		
		//On construit la div à ajouter dans le DOM contenant le message posté
		var divMessage = '<div class="message_livre_or"><table class="header_msg"><tr><td><p>Posté par <strong>'+author+'</strong> - '+dateCourante+'</p></td></tr></table><table class="content_msg"><tr><td><p>'+message+'</p></td></tr></table></div>';
		
		//On détermine la position d'insertion (insertion en tete de page)
		var messages = $$('div.message_livre_or');
		if(messages.length == 0)
			var divInsertBefore = $('add_message_livre_or');
		else var divInsertBefore = messages[0];
		
		//On insere dans le DOM
		divInsertBefore.insert({before: divMessage});
		//On réinitialise le formulaire
		Form.reset('form');
	}
	
}

/**
* Retourne une chaine sans les blancs de début et de fin.
*/
function trim(myString)
{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 