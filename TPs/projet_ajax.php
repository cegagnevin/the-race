<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />
		<title>Projet d'AJAX - The Race</title> 
		<link rel="stylesheet" href="../css/style_projet.css" media="screen" />
		<link rel="stylesheet" href="../css/common.css" media="screen" />
		<link rel="stylesheet" href="../css/menu.css" media="screen" />
		<script language="javascript" src="../lib/prototype.js"></script>
		<script language="javascript" src="../lib/scriptaculous.js"></script>
		<script language="javascript" src="../js/projet.js"></script>
		
		<link rel="stylesheet" href="../css/nyroModal.css" type="text/css" media="screen" />
		<script type="text/javascript" src="../lib/jquery.min.js"></script>
		<script type="text/javascript" src="../lib/jquery.nyroModal.custom.js"></script>
		<script type="text/javascript">
			jQuery(function($){ 
				var $j = jQuery.noConflict();
				$j('.nyroModal').nyroModal();
			});
		</script>
</head>
<body>		
	<h1 id="title"> TPs d'AJAX</h1><span id="authors">Realized by Geoffrey & Cédric</span>
	<div id="container">
		<?php include_once "../Common/menu.html"; ?>
		<h2>This is the amazing race !</h2>
		<button id="start_button">START</button>
		<div id="race_track">
		</div>
		<div id="countdown"></div>
		<br/><br/><br/><br/><br/>
		
		<audio id="audio_player" autoplay>
		  Votre navigateur ne supporte l'élément <code>audio</code>.
		</audio>
	</div>
</body>
</html>