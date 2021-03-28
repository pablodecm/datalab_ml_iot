
FROM jupyter/scipy-notebook:9fe5186aba96

USER root

RUN conda install --quiet --yes \
                "make=4.3" \
                "haversine=2.2.0" \
                "git-lfs=2.13.2" && \
    conda clean --all -f -y && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"


RUN pip install "tensorflow==2.4.1" \
                "RISE==5.7.1" \
                "kaggle==1.5.12" \
                "j2cli[yaml]==0.3.10" \
                "folium==0.12.1" \
                "networkx==2.5" \
                "nbstripout==0.3.9" && \
    conda clean --all -f -y && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"

USER $NB_UID
