#pragma strict
//bounds
static var left = 0.0;
static var right = 0.0;

function Start () {

}
//update bounds
function Update () {
	transform.position = new Vector3((left+right)/2,0.05,-7.5);
	transform.localScale = new Vector3(right-left,0.01,4);
	renderer.material.color = Color(0,0,1.0,0.5);
}