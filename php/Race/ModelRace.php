<?php

	class ModelRace
	{
		/** Single instance */
		private static $_instance;
	
		/** Array containing steps */
		private $_steps;
		
		/**
		 * Constructor as default.
		 */
		private function __construct()
		{
			$this->_steps = array();
			array_push($this->_steps, 'Step1');
			array_push($this->_steps, 'Step2');
			array_push($this->_steps, 'Step3');
			array_push($this->_steps, 'Finish');
		}
		
		/**
		 * Return the single instance 
		 * @return The instance of the model
		 */
		public static function getInstance()
		{
			if (self::$_instance == null)
				self::$_instance = new self();
			return self::$_instance;
		}
		
		/**
		* Empty the session.
		*/
		public function initializeRace()
		{
			@session_start();
			$_SESSION = array();
		}
		
		/*
		* Store the car's position for a specified step.
		* @param String $carName The name of the car
		* @param String $step The name of the step reached
		*/
		public function storeCarRank($carName, $step)
		{
			//Check inputs
			if(	count(trim($carName)) == 0 OR count(trim($step)) == null)
				throw new InvalidArgumentException("Un paramètre passé à la fonction storeCarRank() n'est pas correct");
		      
			//Start session
			@session_start();
			
			//If it's the first car which arrives at an intermediary step, we create the array in the session
			if(!ISSET($_SESSION[$step]))
			{
				$_SESSION[$step] = array();
			}
			
			//Add a car in the array
			array_push($_SESSION[$step], $carName);
			print_r($_SESSION);
		}
		
		/**
		* Allows to get the xml ranking of the race.
		* @return Xml file which describes the car's positions during the race.
		*/
		public function getXmlRanking()
		{
			@session_start();
			$rootNode = '<?xml version="1.0" encoding="UTF-8"?><race>';
			$steps = $this->_steps;

			foreach($steps as $step)
			{
				if(ISSET($_SESSION[$step]))
				{
					$rootNode .= '<step name="'.$step.'">';

					$i=0;
					while(ISSET($_SESSION[$step][$i]))
					{
						$position = $i+1;
						$rootNode .= '<car name="'.$_SESSION[$step][$i].'" position="'.$position.'" />';
						$i++;
					}
					
					$rootNode .= '</step>';
				}
			}
			$rootNode .= '</race>';
			
			header("Content-type: text/xml");
			echo $rootNode;
		}
		
		/**
		* Allows to get the final ranking of the race.
		* @return the final score of the race.
		*/
		public function getFinalScore()
		{
			@session_start();
			/*
			$_SESSION['Step1'][0] = "white_car";
			$_SESSION['Step1'][1] = "red_car";
			$_SESSION['Step1'][2] = "blue_car";
			$_SESSION['Step2'][0] = "white_car";
			$_SESSION['Step2'][1] = "red_car";
			$_SESSION['Step2'][2] = "blue_car";
			$_SESSION['Step3'][0] = "red_car";
			$_SESSION['Step3'][1] = "white_car";
			$_SESSION['Step3'][2] = "blue_car";
			$_SESSION['Finish'][0] = "red_car";
			$_SESSION['Finish'][1] = "white_car";
			$_SESSION['Finish'][2] = "blue_car";
			*/
				
			$steps = $this->_steps;

			$result = array();
			$carName = array("blue_car", "white_car", "red_car");
			foreach($carName as $car)
			{
				$tab = array();
				$tab['name'] = $car;
				$tab['score'] = 0;
				foreach($steps as $step)
				{
					$i=0;
					while(ISSET($_SESSION[$step][$i]))
					{
						if($step == 'Finish')
						{
							if($_SESSION[$step][$i] == $car)
							{
								switch ($i)
								{
									case 0 :
										$tab['score'] += 4;
										break;
									case 1 :
										$tab['score'] += 2;
										break;
									case 2 :
										$tab['score'] += 0;
										break;
								}
							}
						}
						else
						{
							if($_SESSION[$step][$i] == $car)
							{
								switch ($i)
								{
									case 0 :
										$tab['score'] += 2;
										break;
									case 1 :
										$tab['score'] += 1;
										break;
									case 2 :
										$tab['score'] += 0;
										break;
								}
							}
						}
						$i++;
					}
					//$j++;
		
				}
				$result [] = $tab;
			}
			echo json_encode($result);

		}
	}
	/*
	@session_start();
	echo ModelRace::getInstance()->getFinalScore();
	*/
?>