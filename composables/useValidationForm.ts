import {type ZodTypeAny, z} from 'zod'
import {get, groupBy} from 'lodash-es'

export function useValidationForm<T extends ZodTypeAny>(
	schema: T,
	form: MaybeRefOrGetter<Record<string, unknown>>,
	option?: {mode: 'eager' | 'lazy'}
) {
	const optionParam = Object.assign({}, {mode: 'lazy'}, option)

	const isValid = ref<boolean>(true)
	const errors = ref<Record<string, z.ZodIssue[]> | null>(null)

	const clearErrors = () => {
		errors.value = null
	}

	let watcher: null | (() => void) = null
	const eagerValidation = () => {
		if (watcher !== null) {
			return
		}

		watcher = watch(
			() => toValue(form),
			async () => {
				await validate()
			},
			{deep: true}
		)
	}

	const validate = async () => {
		clearErrors()

		const validationResult = await schema.safeParseAsync(toValue(form))

		isValid.value = validationResult.success

		if (!validationResult.success) {
			errors.value = groupBy(validationResult.error.issues, 'path')
			eagerValidation()
		}

		return errors
	}

	const getError = (path: string) =>
		get(errors.value, `${path.replaceAll('.', ',')}.0.message`) as
			| string
			| undefined

	if (optionParam.mode === 'eager') {
		eagerValidation()
	}

	return {validate, errors, isValid, clearErrors, getError}
}
