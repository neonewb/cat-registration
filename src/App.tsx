import React, {useCallback, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {RegistrationFormFields, RegistrationFormFieldsSchema} from './schema';
import './App.css';
import {createCat} from './backand';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const { control, handleSubmit, formState: { errors }  } = useForm<RegistrationFormFields>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			nickName: ''
		},
		resolver: yupResolver(RegistrationFormFieldsSchema)
	});

	const onSubmit = async (data: RegistrationFormFields) => {
		console.log(data);
		setIsLoading(true)
		
		const res = await createCat(data)
		console.log('res', res);
		
		setIsLoading(false)

		if (!res) {
			setIsError(true)
		} else {
			setIsError(false)
			setIsSuccess(true)
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				width='700px'
				margin='auto'
				gap='20px'
			>
				<Typography variant='h1' gutterBottom>
					Привет, катята!
				</Typography>
				
				<Controller
					name="name"
					control={control}
					render={({ field }) => <TextField
						fullWidth
						label='name'
						variant='outlined'
						error={!!errors.name}
						helperText={errors.name?.message}
						{...field}
					/>}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field }) => <TextField
						fullWidth
						label='email'
						variant='outlined'
						error={!!errors.email}
						helperText={errors.email?.message}
						{...field}
					/>}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => <TextField
						fullWidth
						label='password'
						variant='outlined'
						error={!!errors.password}
						helperText={errors.password?.message}
						{...field}
					/>}
				/>
				<Controller
					name="nickName"
					control={control}
					render={({ field }) => <TextField
						fullWidth
						label='nickName'
						variant='outlined'
						error={!!errors.nickName || isError}
						helperText={isError ?  'Такой никнейм занят' : errors.nickName?.message}
						{...field}
					/>}
				/>

				<Button type='submit' variant='contained' disabled={isLoading || isSuccess}>
					{isLoading ? 'Загрузка' : 'Зарегистрироваться'}
				</Button>

				{isSuccess && (
					<Typography variant='h3' gutterBottom>
						Успешно зарегистрировались!
					</Typography>
				)}
			</Box>
		</form>
	);
}

export default App;
