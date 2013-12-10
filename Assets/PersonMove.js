//speed variables
var speed = 0.5;
var backspeed = 0.0;
//movement variables
var startPos = Vector3.zero;
var trans = 0.0;
var xMove = 0.0;
var zMove = 0.0;

//set up a target for the crowd to reduce the chance of hitting the wall.
var x_target;
var z_target = 0.0;

//measure if the crowd got stuck in the corners
var deviant_x = 0;
var deviant_z = 0;

//target variables
var possible_targets : Array;
var target;
//target = GameObject.Find("airrobotJ_2").transform;
var goBack = false;
var marked = false;

//position variables
var intimate = 0.46;
var personal = 1.22;
var social = 3.66;
var sqrLen = 0.0;


function Start(){
	//random returns a float f such thatr 0 <= f <= 1
	var rand = Random.value;
	//movement in x direction
	//transform into a value between -.5 and .5 (+/- 45 degrees)
	trans = rand - 0.5;
	//determine random speed (at least 0.3 so it's not completely tedious)
	rand = Random.value;
	speed = rand/2+1.8;
	
	//determine random starting position within bounding box
	// -2 < x < 2
	// -11 < z < -10
	/*rand = Random.value;
	var startX = 3*rand - 2;
	rand = Random.value;
	var startZ = -1*rand - 10;
	
	startPos = new Vector3(startX, 0.33, startZ);
	transform.position = startPos;*/
	var startX = transform.position.x;
	var startZ = transform.position.z;
	//make the crowds move in various ways
	x_target = trans*6.0;
	var travel_route = 	Mathf.Sqrt((x_target-startX)*(x_target-startX)+(z_target-startZ)*(z_target-startZ));
	var t = travel_route/speed;
	xMove = (x_target-startX)*Time.deltaTime/t;
	zMove = (z_target-startZ)*Time.deltaTime/t;
	
	backspeed = -zMove;
	
	//find all UAVs in range
	possible_targets = new Array();
	possible_targets.AddRange(GameObject.FindGameObjectsWithTag("Airrobot"));
}

function Update () {
	choose_target();
	//determines tilt-ness
	//xMove = trans * Time.deltaTime * speed;
	
	//move forward in z direction
	//zMove = 1.0 * Time.deltaTime * speed;
	
	//determine distance between me and robot
	sqrLen = (target.transform.position - transform.position).sqrMagnitude;
	//the speed of the crowd depends on the distance between the crowd and the robot.
	if( sqrLen < social && !goBack){
		zMove += -.1 * Time.deltaTime * zMove;
	}
	if( sqrLen < personal && !goBack){
		zMove += -.2 * Time.deltaTime * zMove;
	}
	if( sqrLen < intimate || goBack){
		//too scared = leave
		xMove = 0.0;
		if(sqrLen < personal )
			zMove = 0.2*backspeed;
		
		if(sqrLen < social )
			zMove = 0.6*backspeed;
			
		if(sqrLen >=social )
			zMove = 1.0*backspeed;
			
		transform.Translate(xMove, 0, zMove);
		goBack = true;
		//a successful block
		if(marked == false){
			GUI_control.success += 1;
			Debug.Log(GUI_control.success);
			marked = true;
		}
	}

	
	//stop at back wall
	if(transform.position.z <= 0){
		transform.Translate(xMove, 0, zMove);
	}
	
	
	
	//robot fails if people pass the exit
	if(transform.position.z>-3.5 && marked == false){
		GUI_control.fail += 1;
		Debug.Log(GUI_control.fail);
		marked = true;
	}
	
	if(transform.position.z<-14 || transform.position.z>0){
		
		Destroy(gameObject);
	}
	
	//Destroy redundant gameobject automatically.
	deviant_x = Mathf.Abs(transform.position.x);
	deviant_z = Mathf.Abs(transform.position.z+5.5);
	
	if(deviant_x >2.5 && deviant_z < 1.0){
		Destroy(gameObject);
	}
}

//update target
function choose_target(){
	if (possible_targets != null){
		target = possible_targets[0];
		for(var t in possible_targets){
			sqrLen = (target.transform.position - transform.position).sqrMagnitude;
			sqrLen_t = (t.transform.position - transform.position).sqrMagnitude;
			if(sqrLen_t < sqrLen)
				target = t;
		}
	}
}
