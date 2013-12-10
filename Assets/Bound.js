#pragma strict
static var bounds = new Array();
static var bound_test = new Array();

function Start () {
	//renderer.material.color = Color(1,1,1,0);
}

function Update () {
	//Debug.Log(bounds);
	//Three UAVs
	if(bounds.length ==6 && GameObject.FindGameObjectsWithTag("Airrobot").Length == 3){
		Bound_3.left = bounds[0];
		Bound_3.right = bounds[1];
		Bound_2.left = bounds[2];
		Bound_2.right = bounds[3];
		Bound_1.left = bounds[4];
		Bound_1.right = bounds[5];
	}
	//One UAV
	if(bound_test.length == 2 && GameObject.FindGameObjectsWithTag("Airrobot").Length == 1){
		Bound_2.left = bound_test[0];
		Bound_2.right = bound_test[1];
	}

	bounds = new Array();
	bound_test = new Array();
	
}