<?php



namespace CafeteriasBA\Models;

use PDO;

use JsonSerializable;

use CafeteriasBA\DB\Conexion;

use Exception;

use CafeteriasBA\Interfaz\IProducto;



class Producto implements JsonSerializable,IProducto

{

		private $id;

		protected $nombre;

		protected $precio;

		protected $descripcion;

		protected $status;

		protected $fk_categoria;

		protected $img_portada;



		protected $id_categoria;

		protected $categoria;



		/**

			* @param null $id

			*/

		public function __construct($id = null)

		{

				if(!is_null($id))

				{

						$this->findByPk($id);

				}

		}





		function jsonSerialize()

		{

				if(isset($this->id_categoria) && isset($this->categoria))

				{

						return[

							'id' => $this->id,

							'nombre' => $this->nombre,

							'precio' => $this->precio,

							'descripcion' => $this->descripcion,

							'status' => $this->status,

							'fk_categoria' => $this->fk_categoria,

							'id_categoria' => $this->id_categoria,

							'categoria' => $this->categoria,

							'img_portada'=> $this->img_portada

						];

				}else

				{

						return[

							'id' => $this->id,

							'nombre' => $this->nombre,

							'precio' => $this->precio,

							'descripcion' => $this->descripcion,

							'status' => $this->status,

							'fk_categoria' => $this->fk_categoria,

							'img_portada'=> $this->img_portada

						];

				}



		}



		/**

			* @param $id

			*/

		public function findByPk($id)

		{

				$this->setId($id);

				$query = "SELECT * FROM t_producto

                  WHERE ID_producto = ?";

				$stmt = Conexion::getStatement($query);

				$stmt->execute(array($this->getId()));

				$this->loadData($stmt->fetch(PDO::FETCH_ASSOC));

		}



		/**

			* @param $fila

			*/

		protected function loadData($fila)

		{

				/***

					* Set Load Data : Carga los campos de la clase producto.

					*/

				if(isset($fila['id_categoria']) && isset($fila['categoria']))

				{

						$this->setId($fila['ID_producto']);

						$this->setNombre($fila['nombre']);

						$this->setPrecio($fila['precio']);

						$this->setDescripcion($fila['descripcion']);

						$this->setStatus($fila['status']);

						$this->setFkCategoria($fila['fk_categoria']);

						$this->setIdCategoria($fila['id_categoria']);

						$this->setCategoria($fila['categoria']);

						if(isset($fila['img_portada']))
						{
							$this->setImgPortada($fila['img_portada']);
						}

						

				}

				else

				{

						$this->setId($fila['ID_producto']);

						$this->setNombre($fila['nombre']);

						$this->setPrecio($fila['precio']);

						$this->setDescripcion($fila['descripcion']);

						$this->setStatus($fila['status']);

						$this->setFkCategoria($fila['fk_categoria']);

						if(isset($fila['img_portada']))
						{
							$this->setImgPortada($fila['img_portada']);
						}

				}

		}



		/**

			* @return array

			*/

		public static function getAll()

		{

				// TODO: Implement getAll() method.

				//$query =  "SELECT * FROM t_producto JOIN t_categoria_producto ON t_producto.fk_categoria = t_categoria_producto.ID_categoria_producto WHERE 	status = 'activo'";

				$query =  "SELECT t_producto.ID_producto as ID_producto, t_producto.nombre as nombre,t_producto.precio as precio, t_producto.descripcion as descripcion,

t_producto.`status` as `status`, t_producto.fk_categoria as fk_categoria, t_categoria_producto.ID_categoria_producto as id_categoria, t_categoria_producto.descripcion as categoria FROM t_producto JOIN t_categoria_producto ON t_producto.fk_categoria = t_categoria_producto.ID_categoria_producto WHERE status = 'activo'";

				$stmt = Conexion::getStatement($query);

				$stmt->execute();

				while($fila = $stmt->fetch(PDO::FETCH_ASSOC))

				{

						$producto = new Producto();

						$producto->LoadData($fila);

						$salida[] = $producto;

				}

				return $salida;

		}



		public static function getAllProductos()

		{

				// TODO: Implement getAll() method.

				//$query =  "SELECT * FROM t_producto JOIN t_categoria_producto ON t_producto.fk_categoria = t_categoria_producto.ID_categoria_producto WHERE 	status = 'activo'";

				$query =  "SELECT t_producto.ID_producto as ID_producto, t_producto.nombre as nombre,t_producto.precio as precio, t_producto.descripcion as descripcion,

t_producto.`status` as `status`, t_producto.fk_categoria as fk_categoria, t_categoria_producto.ID_categoria_producto as id_categoria, t_categoria_producto.descripcion as categoria, t_producto.img_portada as img_portada FROM t_producto JOIN t_categoria_producto ON t_producto.fk_categoria = t_categoria_producto.ID_categoria_producto WHERE status = 'activo' AND fk_categoria = '1'";

				$stmt = Conexion::getStatement($query);

				$stmt->execute();

				while($fila = $stmt->fetch(PDO::FETCH_ASSOC))

				{

						$producto = new Producto();

						$producto->LoadData($fila);

						$salida[] = $producto;

				}

				return $salida;

		}



		/**

			* @param $id

			* @return array

			*/

		public static function verProducto($id)

		{

				// TODO: Implement verProducto() method.

				$query = "SELECT t_producto.ID_producto as ID_producto, t_producto.nombre as nombre,t_producto.precio as precio, t_producto.descripcion as descripcion,

t_producto.`status` as `status`, t_producto.fk_categoria as fk_categoria, t_categoria_producto.ID_categoria_producto as id_categoria, t_categoria_producto.descripcion as categoria, t_producto.img_portada as img_portada FROM t_producto JOIN t_categoria_producto ON t_producto.fk_categoria = t_categoria_producto.ID_categoria_producto WHERE ID_producto = ?";

				$stmt = Conexion::getStatement($query);

				$stmt->execute([$id]);

				$salida = [];

				while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {

						$producto = new Producto();

						$producto->setId($fila['ID_producto']);

						$producto->loadData($fila);

						$salida[] = $producto;

				}

				return $salida;

		}



		/**

			* @param $data

			* @return bool

			* @throws Exception

			*/

		public static function crearProducto($data)

		{

				// TODO: Implement crearProducto() method.

				$query = "INSERT INTO t_producto (nombre,precio,descripcion,status,fk_categoria,img_portada) VALUES

(:nombre,:precio,:descripcion,:status,:fk_categoria,:img_portada)";

				$status = 'activo';

				$stmt = Conexion::getStatement($query);

				$exito = $stmt->execute([

					'nombre'    =>  $data['nombre'],

					'precio'  =>  $data['precio'],

					'descripcion'      =>  $data['descripcion'],

					'status'     =>  $status,

					'fk_categoria'     =>  $data['fk_categoria'],

					'img_portada' => $data['img_portada'],

				]);

				if($exito)

				{

						return true;

				}

				else

				{

						throw new Exception('no se a podido crear la cafeteria');

				}

		}



		/**

			* @param $data

			* @return Producto

			* @throws Exception

			*/

		public static function editarProducto($data)

		{

				// TODO: Implement editarProducto() method.

				$query = "UPDATE t_producto SET

        nombre=:nombre,

        precio=:precio,

        descripcion=:descripcion,

        fk_categoria=:fk_categoria,

        img_portada=:img_portada

        WHERE ID_producto=:idproducto";

				$stmt = Conexion::getStatement($query);

				$exito = $stmt->execute([

					'nombre'       =>  $data['nombre'],

					'precio'     =>  $data['precio'],

					'descripcion'         =>  $data['descripcion'],

					'fk_categoria'    =>  $data['fk_categoria'],

					'img_portada' => $data['img_portada'],

					'idproducto'    =>  $data['idproducto'],

				]);

				if($exito) {

						$producto = new Producto($data['idproducto']);

						//$cafeteria->loadData($data);

						$salida = $producto;

						return $salida;

				} else {

						throw new Exception('No se ha podido editar el producto.');

				}





		}



		/**

			* @param $id

			* @return array

			*/

		public static function eliminarProducto($id)

		{

				// TODO: Implement eliminarProducto() method.

				$query = "UPDATE t_producto SET status = 'inactivo' WHERE ID_producto = ?";

				$stmt = Conexion::getStatement($query);

				$stmt->execute([$id]);

				if($stmt){

						$salida=[

							'status' => 1,

							'message' => 'Producto eliminada'

						];

				} else {

						$salida=[

							'status' => 0,

							'message' => 'Hubo un error en la eliminacion'

						];

				}

				return $salida;

		}



		/**

			* @return mixed

			*/

		public function getId()

		{

				return $this->id;

		}



		/**

			* @param mixed $id

			*/

		public function setId($id)

		{

				$this->id = $id;

		}



		/**

			* @return mixed

			*/

		public function getNombre()

		{

				return $this->nombre;

		}



		/**

			* @param mixed $nombre

			*/

		public function setNombre($nombre)

		{

				$this->nombre = $nombre;

		}



		/**

			* @return mixed

			*/

		public function getPrecio()

		{

				return $this->precio;

		}



		/**

			* @param mixed $precio

			*/

		public function setPrecio($precio)

		{

				$this->precio = $precio;

		}



		/**

			* @return mixed

			*/

		public function getDescripcion()

		{

				return $this->descripcion;

		}



		/**

			* @param mixed $descripcion

			*/

		public function setDescripcion($descripcion)

		{

				$this->descripcion = $descripcion;

		}



		/**

			* @return mixed

			*/

		public function getStatus()

		{

				return $this->status;

		}



		/**

			* @param mixed $status

			*/

		public function setStatus($status)

		{

				$this->status = $status;

		}



		/**

			* @return mixed

			*/

		public function getFkCategoria()

		{

				return $this->fk_categoria;

		}



		/**

			* @param mixed $fk_categoria

			*/

		public function setFkCategoria($fk_categoria)

		{

				$this->fk_categoria = $fk_categoria;

		}



		/**

			* @return mixed

			*/

		public function getImgPortada()

		{

				return $this->img_portada;

		}



		/**

			* @param mixed $categoria

			*/

		public function setImgPortada($img_portada)

		{

				$this->img_portada = $img_portada;

		}




		/**

			* @return mixed

			*/

		public function getIdCategoria()

		{

				return $this->id_categoria;

		}



		/**

			* @param mixed $id_categoria

			*/

		public function setIdCategoria($id_categoria)

		{

				$this->id_categoria = $id_categoria;

		}



		/**

			* @return mixed

			*/

		public function getCategoria()

		{

				return $this->categoria;

		}



		/**

			* @param mixed $categoria

			*/

		public function setCategoria($categoria)

		{

				$this->categoria = $categoria;

		}









}