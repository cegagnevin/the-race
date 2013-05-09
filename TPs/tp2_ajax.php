<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />
		<title>TP2 - AJAX</title> 
		<link rel="stylesheet" href="../css/style_tp2.css" media="screen" />
		<link rel="stylesheet" href="../css/common.css" media="screen" />
		<link rel="stylesheet" href="../css/menu.css" media="screen" />
		<script language="javascript" src="../lib/prototype.js"></script>
		<script language="javascript" src="../js/tp2.js"></script>
</head>
<body>		
	<h1 id="title"> TPs d'AJAX</h1><span id="authors">Realized by Geoffrey & Cédric</span>
	<div id="container">
		<?php include_once "../Common/menu.html"; ?>
		<div id="messages_livre_or">
			<div id="add_message_livre_or">			
				<form id="form" method="POST">
						<table id="title_add_message">
							<tr>
								<td colspan="2"><h3>Ajouter un message à notre livre d'or</h3></td>
							</tr>
						</table>
						<table>
							<tr>
								<td>
									<br/><label for="pseudo">Pseudo</label>
								</td>
								<td>
									<br/><input type="text" name="pseudo" id="pseudo" size="30" />
								</td>
							</tr>
							<tr>
								<td>
									<label for="message">Message</label>
								</td>
								<td>
									<textarea name="message" id="message" cols="30" rows="5" ></textarea>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<p id="submitLivreDOr">Send</p>		
								</td>	
							</tr>
						</table>
				</form>	
			</div>
		</div>
	</div>
</body>
</html>