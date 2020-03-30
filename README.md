# Practical Data Science for IoT

These repository includes the materials for three lectures on Data Science
applied to IoT data for the Master of Data Science (jointly organised by UC-UIMP-CSIC).

Join one of this Gitter rooms for related questions and announcements:
  - 2020 UC-UIMP-CSIC Master of Data Science [![Gitter](https://badges.gitter.im/datalab_ml_iot/master_2020_unican.svg)](https://gitter.im/datalab_ml_iot/master_2020_unican?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


## Use Cases and Notebooks

The tutorial is broken in six parts, each contained within a folder and based around
a single Jupyter Notebook with a description and exercises.
The notebooks have been prepared to allow their
execution in Google Colaboratory or a similar notebook service,
click on each link below to open them.

Here there is a list and a short description of each part of the tutorial:

0. `00_introduction/introduction.ipynb`: includes a very short presentation of the
  tutorial instructor, as well as the objectives, scope limitations and program
  overview of the tutorial.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/00_introduction/introduction.ipynb)

1. `01_predictive_mainteinance/predictive_maintenance.ipynb`: predict when an turbofan
  plane engine will break based on reading of the integrated sensors so costly maintenance
  tasks can be scheduled smartly.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/01_predictive_mainteinance/predictive_maintenance.ipynb)

2. `02_trip_duration_prediction/trip_duration_prediction.ipynb`: based real-world Taxi
  data from New York city in 2016, predict the duration of a taxi trip based on the
  pickup/drop-off coordinates, taxi information and additional datasets.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/02_trip_duration_prediction/trip_duration_prediction.ipynb)

3. `03_iot_for_pandemics/iot_for_pandemics.ipynb`: brainstorm the viability and data aspects of some IOT-based solutions or systems that could help us with the current and future pandemics. Example of contact tracing using your own Google Location history.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/03_iot_for_pandemics/iot_for_pandemics.ipynb)

4. `04_internet_of_wands/internet_of_wands.ipynb` (WIP): using a smartphone as a magic wand,
  collect data of labelled magic spells and then train a spell recognition model
  based on our own sensor data. 
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/04_internet_of_wands/internet_of_wands.ipynb)

5. `05_computer_vision_for_iot/computer_vision_for_iot.ipynb` (WIP): we will use pre-trained
   computer vision models that could run on the edge to identify and analyse objects in video camera footage
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/05_computer_vision_for_iot/computer_vision_for_iot.ipynb)

## Local Setup

First, download this repo and enter the folder:

```bash
git clone https://github.com/pablodecm/datalab_ml_iot.git
cd datalab_ml_iot
```

The basic Python environment required to execute the Jupyter Notebooks is provided
in the `environment.yml` file in the root of the repository. If you have already Anaconda/Miniconda
in your system (otherwise follow [this instructions](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html#)), You can create it with the following command:
```bash
conda env create -f environment.yml
```
If the environment already exist, it can be updated when a change was made using the command:
```bash
conda env update -f environment.yml
```

When the right environment is setup, simply activate and run Jupyter Notebook and use your browser to
go to open the desired notebook:
```bash
conda activate datalab_ml_iot
jupyter notebook
```