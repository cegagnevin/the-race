<?php
	require_once __DIR__ . '/ModelRace.php';


	class ControllerRace
	{
		/** Instance unique */
		private static $_instance;
	
	
		/** Le modele de la course */
		private $_mdlRace = null;
		
		/**
		 * Constructeur par défaut.
		 */
		private function __construct()
		{
			$this->_mdlRace = ModelRace::getInstance();	
		}
		
		/**
		 * Renvoi de l'instance et initialisation si nécessaire.
		 * @return L'instance du controleur
		 */
		public static function getInstance ()
		{
			if (self::$_instance == null)
				self::$_instance = new self();
			return self::$_instance;
		}
		
		/**
		* Associate a processing for an action given.
		*/
		public function processRequest($action)
		{
			try
			{
				//Never trust users input
				$action = htmlspecialchars($action);
				
				switch ($action)
				{
					case "StoreCarRank" :
						$carName = htmlspecialchars($_POST[ 'carName' ]);
						$step = htmlspecialchars($_POST[ 'step' ]);
						$this->_mdlRace->storeCarRank($carName, $step);
						break;

					case "InitRace" :
						$this->_mdlRace->initializeRace();
						break;
						
					case "XmlRanking" :
						$this->_mdlRace->getXmlRanking();
						break;
						
					case "FinalRank" :
						$this->_mdlRace->getFinalScore();
						break;
						
					default : //Error
						echo "Error...";
						break;
						
				}
			}
			catch(Exception $e)
			{
				echo 'Exception reçue : '.$e->getMessage().'<br/>';
				echo 'Trace : <pre>'.$e->getTraceAsString().'</pre><br/>';
			}
		}
		

	}
	
	
	if(isset($_POST[ 'action']))
	{
		//Récupération de l'action
		$action = $_POST[ 'action'];
		//Instanciation du controleur de la course
		$controllerRace = ControllerRace::getInstance();
		//Le controleur traite l'action
		$controllerRace->processRequest($action);
	}
?>