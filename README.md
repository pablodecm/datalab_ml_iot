# Practical Data Science for IoT

These repository includes the materials for three lectures on Data Science
applied to IoT data for the Master of Data Science (jointly organized by UC-UIMP-CSIC).

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

1. `01_predictive_maintenance/predictive_maintenance.ipynb`: predict when an turbofan
  plane engine will break based on reading of the integrated sensors so costly maintenance
  tasks can be scheduled smartly.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/01_predictive_maintenance/predictive_maintenance.ipynb)

2. `02_trip_duration_prediction/trip_duration_prediction.ipynb`: based real-world Taxi
  data from New York city in 2016, predict the duration of a taxi trip based on the
  pickup/drop-off coordinates, taxi information and additional datasets.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/02_trip_duration_prediction/trip_duration_prediction.ipynb)

3. `03_solving_problems/solving_problems.ipynb`: brainstorm the viability and data aspects of some IOT-based and data science solutions or systems that could help us with real word problems. Example of pandemic contact tracing using your own Google Location history.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/03_solving_problems/solving_problems.ipynb)

4. `04_internet_of_wands/internet_of_wands.ipynb` (WIP): using a smartphone as a magic wand,
  collect data of labelled magic spells and then train a spell recognition model
  based on our own sensor data.
  [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]( https://colab.research.google.com/github/pablodecm/datalab_ml_iot/blob/master/04_internet_of_wands/internet_of_wands.ipynb)

## Local Setup

First, download this repo and enter the folder:

```bash
git clone https://github.com/pablodecm/datalab_ml_iot.git
cd datalab_ml_iot
```

### VSCode Dev Container

The repository is setup for using VSCode and an isolated Docker environment. If you have VSCode already
installed with the Remote Extension(you can follow the
[official instructions](https://code.visualstudio.com/docs/setup/setup-overview) alternatively) and
Docker and Docker Compose setup in your machine, run the following command:

```bash
code .
```

That will open VSCode and then click `Open in Remote Container` in the
bottom right of the screen. A development environment image will be built and accessed
automatically. You can directly access Jupyter Lab at http://localhost:8888/ with the browser
of the host machine.

### Conda-based Isolated Environment

The basic Python environment required to execute the Jupyter Notebooks is provided
in the `environment.yml` file in the root of the repository. If you have already Anaconda/Miniconda
in your system (otherwise follow [this instructions](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html#)), You can create it with the following command:

```bash
# use environment.m1.yml if you have a M1 arm64 machine
conda env create -f environment.yml
```

If the environment already exist, it can be updated when a change was made using the command:

```bash
# use environment.m1.yml if you have a M1 arm64 machine
conda env update -f environment.yml
```

When the right environment is setup, simply activate and run Jupyter Notebook and use your browser to
go to open the desired notebook:

```bash
conda activate datalab_ml_iot
jupyter lab
```
