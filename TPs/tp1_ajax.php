<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />
		<title>TP1 - AJAX</title> 
		<link rel="stylesheet" href="../css/style_tp1.css" media="screen" />
		<link rel="stylesheet" href="../css/menu.css" media="screen" />
		<link rel="stylesheet" href="../css/common.css" media="screen" />
		<script language="javascript" type="text/javascript" src="../js/tp1.js"></script>
</head>
<body>	
	<h1 id="title"> TPs d'AJAX</h1><span id="authors">Realized by Geoffrey & Cédric</span>
	<div id="container">
	<?php include_once "../Common/menu.html"; ?>
		<table>
			<tr>
				<td>
					<form id="form" method="POST">	
						<h3>Contact Us <img src="form_ico.gif" /></h3>
					
						<fieldset><legend>Contact form</legend>
							<p class="first">
								<label for="name">Name</label>
								<input type="text" name="name" id="name" size="30" />
							</p>
							<p>
								<label for="surname">Surname</label>
								<input type="text" name="surname" id="surname" size="30" />
							</p>
							<p>
								<label for="age">Age</label>
								<input type="text" name="age" id="age" size="30" />
							</p>
							<p>
								<label for="email">Email</label>
								<input type="text" name="email" id="email" size="30" />
							</p>					
							<p>
								<label for="message">Hobbies</label>
								<select name="" size="5" multiple>
									<option>Sports</option>
									<option>Music</option>
									<option>Cinema</option>
									<option>Cooking</option>
									<option>Video Games</option>
								</select> 
							</p>					
							<br/>
							<p id="submit">Send</p>		
							<p id="errorMessage"><p/>	
							<p id="submitMessage"><p/>				
						</fieldset>									
					</form>	
				</td>
			</tr>
		</table>
	</div>
</body>
</html>