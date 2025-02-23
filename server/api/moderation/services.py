import PIL
from ultralytics import YOLO
from transformers import pipeline
from typing import Dict, Any, List

text_classifier = pipeline('text-classification', model='unitary/toxic-bert')
image_classification = YOLO('yolov8n.pt')

def classify_text_messages(msg: str) -> Dict[str, Any]:
    """
    Classifies text messages into toxic/non-toxic.

    Args: 
        msg: text content of the message.

    Returns:
        classification: Contains class label and severity.    
    """
    result = text_classifier(msg)
    label = result['label']
    cs = result['score']

    classification = {}

    if label == 'toxic':
        classification['label'] = 'toxic'
        if cs >= 0.75:
            classification['severity'] = 'high'
        elif cs >= 0.50 and cs < 0.75:
            classification['severity'] = 'moderate'
        else:
            classification['severity'] = 'low'
    else:
        classification['label'] = 'not toxic'
    
    return classification

def classify_image(image_path: str) -> bool:
    """
    Classifies images to identify explicit/nsfw data.

    Args:
        image_path: path of saved image to classify.
    
    Returns:
        bool: True is there are objectionable images.
    """
    img = PIL.Image.open(image_path)  
    results = image_classification(img) 

    for detection in results[0].boxes:
        label = results[0].names[int(detection.cls)]  
        confidence = float(detection.conf)

        objectionable_labels = ["gun", "knife", "nudity", "violence", "explicit"]

        if label in objectionable_labels and confidence >= 0.6:  
            return True  

    return False