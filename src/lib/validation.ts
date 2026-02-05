export function validateSchema(data: any, schema: {[key: string]: {required?: boolean, type: string, min?: number, max?: number, pattern?: RegExp}}): {valid: boolean, errors: {[key: string]: string}} {
  const errors: {[key: string]: string} = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Required
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field} é obrigatório`;
      continue;
    }

    if (!value) continue;

    // Type validation
    if (rules.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field] = 'Email inválido';
    }

    if (rules.type === 'url' && value && !/^https?:\/\/.+/.test(value)) {
      errors[field] = 'URL inválida (deve começar com http:// ou https://)';
    }

    // Min/Max length
    if (rules.min && value.length < rules.min) {
      errors[field] = `Mínimo de ${rules.min} caracteres`;
    }

    if (rules.max && value.length > rules.max) {
      errors[field] = `Máximo de ${rules.max} caracteres`;
    }

    // Pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = `Formato inválido`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export const projectSchema = {
  title: { required: true, type: 'string', min: 3, max: 100 },
  description: { required: true, type: 'string', min: 10, max: 500 },
  technologies: { required: true, type: 'array' },
};
