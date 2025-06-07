import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './types'

type CreateModalPayload = {
	selectedTime: string | null
	selectedDate: string
}

const initialState: RootState['modal'] = {
	isOpen: false,
	mode: null,
	selectedTime: null,
	selectedDate: null,
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openCreateModal: (state, action: PayloadAction<CreateModalPayload>) => {
			state.isOpen = true
			state.mode = 'create'
			state.selectedTime = action.payload.selectedTime
			state.selectedDate = action.payload.selectedDate
		},
		closeModal: () => initialState,
	},
})

export const { openCreateModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
