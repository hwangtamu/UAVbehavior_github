#pragma strict

//parameters for testers
static var x_max = -1e10;
static var x_min = 1e10;
static var y_max = -1e10;
static var y_min = 1e10;
static var z_max = -1e10;
static var z_min = 1e10;

function Start () {

}

function Update () {
	//keyboard control to the test cylinder
	if (Input.GetButton("Forward"))
		transform.Translate(0,0,0.1);
	if (Input.GetButton("Backward"))
		transform.Translate(0,0,-0.1);
	if (Input.GetButton("Left"))
		transform.Translate(-0.1,0,0);
	if (Input.GetButton("Right"))
		transform.Translate(0.1,0,0);
	//reduce the UAV number from three to one
	if (Input.GetButtonDown("SingleUAV")){
		Destroy(GameObject.Find("airrobotJ_2_1"));
		Destroy(GameObject.Find("airrobotJ_2_3"));
		Destroy(GameObject.Find("Robot_1_bound"));
		Destroy(GameObject.Find("Robot_3_bound"));
		
	}
}