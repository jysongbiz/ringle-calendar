export const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

export const HOURS = Array.from({ length: 24 }, (_, i) => i)

export const TIME_FORMAT = {
	HOUR: 'HH:mm',
	MINUTE: 'mm',
} as const

export const DATE_FORMATS = {
	CELL_KEY: 'YYYY-MM-DD',
	DAY_NUMBER: 'D',
	HOUR: 'HH:mm',
	MONTH_YEAR: 'YYYY년 M월',
	YEAR: 'YYYY',
	MONTH: 'M',
	TIME: {
		HOUR_ONLY: 'HH',
		HOUR_MINUTE: 'HH:mm',
	},
} as const

export const VIEWS = ['week', 'month'] as const
export type ViewType = (typeof VIEWS)[number]
export const DEFAULT_VIEW: ViewType = 'week'
