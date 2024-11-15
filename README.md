# wincc-unified
WinCC Unified Custom Web Controls and Scripts

1. TreeView
Archive the contents of the TreeView folder. The name of the zip fie shuld be {guid}.zip (Make sure the GUID is between braces)
The GUID you can copy paste it from the manifest.json

![image](https://github.com/user-attachments/assets/ae0a2d4e-44e2-46c0-9819-d13a04305b37)
![image](https://github.com/user-attachments/assets/2dd9e412-8fbb-4041-a4fe-cadf13e7c80f)

Copy to zip file to: C:\Program Files\Siemens\Automation\Portal V18\Data\Hmi\CustomControls

![image](https://github.com/user-attachments/assets/aef24784-b8b9-4e7f-807f-9c5ab67e273f)

Go to your TIA Portal open a screen and open the toolbox. Now the TreeView should be available in "My Control". If it doesn't appear, press refresh (in case TIA Portal was already open)

![image](https://github.com/user-attachments/assets/939e997e-1722-4e2d-aca6-6e5e20598b11)

Drag and drop the TreeView to your screen. 
Open it propreties and open the Interface tab. There is 1 entry: "treeData". The accepted format it's JSON in the following way:

The JSON must have the following keys: label, value and children.

Example of usage (JSON):
{"label":"Root","children":[{"label":"Child 1","value":"123"},{"label":"Child 2","value":"ABC"},{"label":"Child 3","children":[{"label":"Child 1.1","value":"text"},{"label":"Child 1.2","value":"other text"}]}]}

Result:
![image](https://github.com/user-attachments/assets/aab01bb8-c2ab-4970-abb0-6bf2eebe01bf)
