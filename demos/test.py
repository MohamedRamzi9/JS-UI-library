
class BinaryExpression:
	def __init__(self, a, b):
		self.a = a
		self.b = b

	def to_str(self, operator):
		return f"({str(self.a)} {operator} {str(self.b)})"
		


class And(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str("and")

class Or(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str("or")

class Equal(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str("==")

class NotEqual(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str("!=")

class GreaterThan(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str(">")

class LessThan(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str("<")

class GreaterThanOrEqual(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str(">=")

class LessThanOrEqual(BinaryExpression):
	def __str__(self) -> str:
		return self.to_str("<=")


class Term:
	def __init__(self, expression):
		self.expression = expression

	def __str__(self) -> str:
		return str(self.expression)

	def __or__(self, other):
		return Term(Or(self, other))

	def __and__(self, other):
		return Term(And(self, other))

	def __eq__(self, other):
		return Term(Equal(self, other))
	
	def __ne__(self, other):
		return Term(NotEqual(self, other))
	
	def __gt__(self, other):
		return Term(GreaterThan(self, other))
	
	def __lt__(self, other):
		return Term(LessThan(self, other))
	
	def __ge__(self, other):
		return Term(GreaterThanOrEqual(self, other))
	
	def __le__(self, other):
		return Term(LessThanOrEqual(self, other))



expression = (Term("age") > 30) & (Term("age") < 40) | (Term("name") == "John") & (Term("name") != "Doe")

expression = Select("name", "age").From("users").Where(expression)

print(expression)