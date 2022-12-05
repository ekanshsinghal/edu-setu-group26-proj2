FROM python:latest

RUN apt-get update -y
# RUN apt-get install -y python3-pip python3

RUN mkdir -p /opt/oracle
RUN cd /opt/oracle

RUN mkdir -p /usr/src/code/backend
WORKDIR /usr/src/code/backend

COPY requirements.txt /usr/src/code/backend/requirements.txt
RUN pip3 install -r requirements.txt
RUN curl -O https://download.oracle.com/otn_software/linux/instantclient/218000/instantclient-basiclite-linux.x64-21.8.0.0.0dbru.zip 


RUN apt-get install libaio1

COPY . /usr/src/code/backend/
# RUN pip3 install -r requirements.txt

RUN apt-get install unzip
RUN unzip instantclient-basiclite-linux.x64-21.8.0.0.0dbru.zip 

RUN mv -f admin/* instantclient_21_8/network/admin/

ENV ORACLE_HOME=/usr/src/code/backend/instantclient_21_8
ENV DYLD_LIBRARY_PATH=$ORACLE_HOME
ENV LD_LIBRARY_PATH=$ORACLE_HOME
ENV PATH=$ORACLE_HOME:$PATH
ENV TNS_ADMIN=$ORACLE_HOME/network/admin

# ENTRYPOINT [ "flask" ]
# CMD [ "run" , "--host=0.0.0.0" ,"--port=5000"]

CMD ["gunicorn", "-b", "0.0.0.0:5000", "--workers=10", "--worker-class=gthread", "--threads=5", "wsgi:app"]
