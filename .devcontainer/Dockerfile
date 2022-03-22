
FROM jupyter/scipy-notebook:9fe5186aba96

USER root

RUN conda install --quiet --yes \
                "make=4.3" \
                "haversine=2.2.0" \
                "git-lfs=3.1.2" \
                "xgboost=1.5.0" && \
    conda clean --all -f -y && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"


RUN pip install "tensorflow==2.5.0" \
                "kaggle==1.5.12" \
                "j2cli[yaml]==0.3.10" \
                "folium==0.12.1" \
                "networkx==2.5" \
                "nbstripout==0.3.9" && \
    conda clean --all -f -y && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"

USER $NB_UID
