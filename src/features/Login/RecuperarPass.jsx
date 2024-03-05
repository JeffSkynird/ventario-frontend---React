import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Alert,
	Button,
	Chip,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
//import fondo from '../../assets/images/background3.jpg'
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { iniciarSesion, recuperarContraseña } from "../../services/api/auth/login";
import { guardarSession } from "../../services/session/Session";
import { encriptarJson } from "../../helpers/Encriptado";
import { useNavigate } from "react-router-dom";

import fondo from "../../assets/images/background-ventario.png";
import logo from "../../assets/images/logo.png";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { ca } from "date-fns/locale";
export default function RecuperarPass() {
	const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } =
		useAuth();
	let navigate = useNavigate();
	const [alignment, setAlignment] = useState("miembros");
	const [type, setType] = useState("recuperarContraseña");
	const [email, setEmail] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const theme = useTheme();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		mode: "onChange",
	});
	useEffect(() => {
		if (usuario != null) {
			console.log(usuario);
			if (usuario.user.type == "Comprador") {
				navigate("/");
			} else if (usuario.user.type == "Vendedor") {
				navigate("/activos");
			} else if (usuario.user.type == "Admin") {
				navigate("/datos");
			}
		}
	}, [usuario]);

	const enviarCodigo=async()=>{
		mostrarLoader(true);
		const data = await recuperarContraseña({email,type:'solicitud'})
		mostrarLoader(false);
		mostrarNotificacion({ type: data.status, message: data.message });
		if (data.status == "success") {
			setType("paso3")
		}
	}
	const verificacionCodigo=async()=>{
		mostrarLoader(true);
		const data = await recuperarContraseña({email,type:'verificacion',code})
		mostrarLoader(false);
		mostrarNotificacion({ type: data.status, message: data.message });
		if (data.status == "success") {
			setType("paso4")
		}
	}
	const cambioPass=async()=>{
		mostrarLoader(true);
		const data = await recuperarContraseña({email,type:'cambio',newPass:password})
		mostrarLoader(false);
		mostrarNotificacion({ type: data.status, message: data.message });
		if (data.status == "success") {
			navigate('/login')
		}
	}
	const entrar = async (dt) => {
		mostrarLoader(true);
		try {
			let obj = {
				email: dt.email,
				password: dt.password,
			};

			const data = await iniciarSesion(obj);
			mostrarLoader(false);
			mostrarNotificacion({ type: data.status, message: data.message });
			if (data.status == "success") {
				let encrypt = encriptarJson(
					JSON.stringify({
						user: {
							names: data.data.user.name,
							email: data.data.user.email,
							avatar: data.data.user.avatar,
							id: data.data.user.id,
							type: data.data.user.rol.rol,
						},
						token: data.data.token,
					})
				);
				cargarUsuario(encrypt);
				guardarSession(encrypt);
			}
		} catch (e) {
			console.log(e);
			mostrarLoader(false);
			mostrarNotificacion({
				type: e.response.data.status,
				message: e.response.data.message,
			});
		}
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<Grid container sx={{ height: "100vh", backgroundSize: "cover" }}>
			<Grid
				item
				xs={0}
				md={7}
				sx={{
					display: { xs: "none", md: "block" },
					backgroundColor: "#00050d",
				}}>
				<Box
					sx={{
						borderBottomRightRadius: 25,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundImage: `url(${fondo})`,
						height: "100vh",
						backgroundSize: "cover",
					}}>
					{/*           <Lottie animationData={books} style={{ height: '85vh' }} />
					 */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<img src={logo} alt="" style={{ width: "60%", height: "30%" }} />
					</Box>

					<div style={{ position: "absolute", bottom: 10 }}>
						<Typography
							style={{ color: "white", textAlign: "center" }}
							color="initial">
							Copyright © 2023 by VENTARIO
						</Typography>
						<Typography
							style={{ color: "white", textAlign: "center" }}
							color="initial">
							All rights reserved
						</Typography>
					</div>
				</Box>
			</Grid>
			<Grid
				item
				xs={12}
				md={5}
				sx={{
					backgroundColor: theme.palette.mode != "dark" ? "#F2F7F2" : "auto",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Grid container spacing={2}>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}>
						<Paper
							sx={{
								marginRight: { lg: "20%", md: "10%", sm: "10%", xs: "2%" },
								marginLeft: { lg: "20%", md: "10%", sm: "10%", xs: "2%" },
							}}>
							<Box
								sx={{
									backgroundColor: "#076B00",
									borderTopLeftRadius: 3,
									borderTopRightRadius: 3,
									padding: 2,
								}}>
								<Typography
									variant="h4"
									sx={{ textAlign: "center", color: "#FFF" }}>
									{type === "login" ? "Iniciar Sesión" : "Recuperar Contraseña"}
								</Typography>
							</Box>

							{ type === "recuperarContraseña" ? (
								<Grid
									container
									spacing={2}
									sx={{
										paddingLeft: 5,
										paddingRight: 5,
										paddingTop: 0,
										paddingBottom: 5,
									}}>
									<Grid item xs={12}>
										<h4
											style={{
												fontWeight: "normal",
												justifyContent: "center",
											}}>
											Introduce el correo electrónico asociado a tu cuenta para
											cambiar tu contraseña.
										</h4>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											label="Ingrese Email"
											sx={{ width: "100%" }}
											name="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Grid>

									<Grid item xs={12}>
										<Button
											onClick={enviarCodigo}
											fullWidth
											disabled={email==''}
											sx={{ borderRadius: 9 }}
											variant="contained"
											color="primary">
											Siguiente
										</Button>
									</Grid>

									<Grid item xs={12}>
										<Button
											onClick={() =>navigate('/login')}
											fullWidth
											variant="text">
											Cancelar
										</Button>
									</Grid>
								</Grid>
							) : type === "paso3" ? (
								<Grid
									container
									spacing={2}
									sx={{
										paddingLeft: 5,
										paddingRight: 5,
										paddingTop: 0,
										paddingBottom: 5,
									}}>
									<Grid item xs={12}>
										<Typography
											style={{
												marginTop:10,
												fontWeight: "normal",
												textAlign:'left'
											}}>
											Consulta tu correo electrónico para obtener tu código de
											verificación
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<TextField
											variant="outlined"
											label="Código de Verificaciíon"
											sx={{ width: "100%" }}
											name="code"
											value={code}
											onChange={(e) => setCode(e.target.value)}
										/>
									</Grid>

									<Grid item xs={12}>
										<Button
											onClick={verificacionCodigo}
											fullWidth
											disabled={code==''}
											sx={{ borderRadius: 9 }}
											variant="contained"
											color="primary">
											Siguiente
										</Button>
									</Grid>
								</Grid>
							) : type === "paso4" ? (
								<Grid
									container
									spacing={2}
									sx={{
										paddingLeft: 5,
										paddingRight: 5,
										paddingTop: 5,
										paddingBottom: 5,
									}}>
									<Grid item xs={12}>
										<FormControl variant="outlined" sx={{ width: "100%" }}>
											<InputLabel htmlFor="outlined-adornment-password">
												Contraseña
											</InputLabel>
											<OutlinedInput
												id="outlined-adornment-password"
												type={showPassword ? "text" : "password"}
												name="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														entrar();
													}
												}}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() => setShowPassword(!showPassword)}
															onMouseDown={handleMouseDownPassword}
															edge="end">
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												}
												label="Contraseña"
											/>
										</FormControl>
									</Grid>

									<Grid item xs={12}>
										<FormControl variant="outlined" sx={{ width: "100%" }}>
											<InputLabel htmlFor="outlined-adornment-password2">
												Confirme su Contraseña
											</InputLabel>
											<OutlinedInput
												id="outlined-adornment-password2"
												type={showPassword ? "text" : "password"}
											 
												value={password2}
												onChange={(e) => setPassword2(e.target.value)}
												name="password2"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														cambioPass();
													}
												}}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() => setShowPassword(!showPassword)}
															onMouseDown={handleMouseDownPassword}
															edge="end">
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												}
												label="Confirme su Contraseña"
											/>
										</FormControl>
									</Grid>

									<Grid item xs={12}>
										<Button
											onClick={cambioPass}
											fullWidth
											disabled={password=='' || password2=='' || password!=password2}
											sx={{ borderRadius: 9 }}
											variant="contained"
											color="primary">
											Recuperar
										</Button>
									</Grid>
								</Grid>
							) : null}
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}