#pragma strict
//count
static var success = 0.0;
static var fail = 0.0;

//Game instructions
var showText = 1;
var textArea = new Rect(0,0,Screen.width, Screen.height);
var skin : GUISkin;

skin = ScriptableObject.CreateInstance(GUISkin);
skin.textArea.normal.textColor = Color(0,0,0,0);


//display
function OnGUI(){
	GUI.skin = skin;
	
	var instruction  = "Controller:\nEasy Mode: [1]\nHard Mode: [2]\nImpossible Mode: [3]\nTest Mode: [4]\nCheat Mode: [5]\nStop Spawning: [space]\nSuccess:"
    	+success.ToString()+"\nFail:"+fail.ToString()+"\nSuccess Rate:"+(success/(success+fail)).ToString();

	var test = "Controller: Move Forward: [W/up]\nMove Backward: [S/down]\nMove Left: [A/left]\nMove Right: [D/right]\nSingle UAV: [6/0]\nReveal Single UAV:[7]";
    
    var rangeX = "UAV Minimum X in History: "+Test.x_min.ToString()+"\nUAV Maximum X in History: "+Test.x_max.ToString();
    var rangeY = "UAV Minimum Y in History: "+Test.y_min.ToString()+"\nUAV Maximum Y in History: "+Test.y_max.ToString();
    var rangeZ = "UAV Minimum Z in History: "+Test.z_min.ToString()+"\nUAV Maximum Z in History: "+Test.z_max.ToString();
    var xyz    = "UAV current coordinates: "+GameObject.Find("airrobotJ_2_2").transform.position.ToString();
    
    var range = rangeX+"\n"+rangeY+"\n"+rangeZ+"\n"+xyz;
    
    

    
    //switch textboxes
    if(showText == 1){	
    	GUI.Label(textArea,instruction);
    }
    
    if(showText == 2){
    	GUI.Label(textArea,test);
    }
    
    if(showText == 3){
    	GUI.Label(textArea,range);
    }
}

function Start () {

}

function Update () {
	//keyboard control to switch textboxes.
	if (Input.GetButtonDown("Case4"))
		showText = 2;
	if (GameObject.FindGameObjectsWithTag("Airrobot").Length == 1 && Input.GetButtonDown("Range"))
		showText = 3;
}