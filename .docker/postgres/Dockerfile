# Constroi uma imagem docker com postgres e usario root para não dar conflito ao compartilhar os dados do banco de dados com o pc local
# Compartilha os dados do banco de dados com o pc local na pasta .docker

FROM postgres

RUN usermod -u 1000 postgres

