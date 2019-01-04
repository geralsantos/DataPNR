<?php
class modeloAcceso extends MySQL{

    public function getSesion($usuario, $clave){
        $usuario = $this->executeQuery("select * from usuarios us where us.username=:username and us.password=:password",array("username"=>$usuario,"password"=>$clave));
        return $usuario;
    }
}
