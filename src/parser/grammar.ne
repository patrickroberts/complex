@preprocessor typescript

@{%
const unwrap = (d: any[]) => d[1];
const binary = (d: any[]) => ({ type: 'BinaryExpression', operator: d[2], left: d[0], right: d[4] });
const join = (d: any[]) => d.join('');
%}

Expression -> _ AdditiveExpression _ {% unwrap %}

AdditiveExpression ->
    MultiplicativeExpression {% id %}
  | AdditiveExpression _ "+" _ MultiplicativeExpression {% binary %}
  | AdditiveExpression _ "-" _ MultiplicativeExpression {% binary %}

MultiplicativeExpression ->
    ExponentiationExpression {% id %}
  | MultiplicativeExpression _ "*" _ ExponentiationExpression {% binary %}
  | MultiplicativeExpression _ "/" _ ExponentiationExpression {% binary %}
  | MultiplicativeExpression _ "%" _ ExponentiationExpression {% binary %}

ExponentiationExpression ->
    UnaryExpression {% id %}
  | LeftHandSideExpression _ ExponentiationOperator _ ExponentiationExpression {% binary %}

ExponentiationOperator -> "*" "*" {% join %}

UnaryExpression ->
    LeftHandSideExpression {% id %}
  | UnaryOperator _ UnaryExpression {% d => ({ type: 'UnaryExpression', operator: d[0], argument: d[2] }) %}

UnaryOperator ->
    "+" {% id %}
  | "-" {% id %}

LeftHandSideExpression -> 
    PrimaryExpression {% id %}
  | CallExpression {% id %}

CallExpression -> Identifier _ Arguments {% d => ({ type: 'CallExpression', callee: d[0], arguments: d[2] }) %}

Arguments ->
    "(" _ ")" {% () => [] %}
  | "(" ArgumentList ")" {% unwrap %}

ArgumentList ->
    Expression
  | ArgumentList "," Expression {% d => d[0].concat(d[2]) %}

PrimaryExpression ->
    Identifier {% id %}
  | Literal {% id %}
  | ParenthesizedExpression {% id %}

ParenthesizedExpression -> "(" Expression ")" {% unwrap %}

Identifier -> IdentifierName {% d => ({ type: 'Identifier', name: d[0] }) %}

IdentifierName ->
    IdentifierStart {% join %}
  | IdentifierName IdentifierPart {% join %}

IdentifierStart -> [$A-Z_a-z]

IdentifierPart -> [$0-9A-Z_a-z]

Literal -> NumericLiteral {% d => ({ type: 'Literal', value: Number(d[0]) }) %}

NumericLiteral ->
    DecimalLiteral {% id %}
  | NonDecimalIntegerLiteral {% id %}

DecimalLiteral ->
    DecimalIntegerLiteral "." {% join %}
  | DecimalIntegerLiteral "." DecimalDigits {% join %}
  | DecimalIntegerLiteral "." DecimalDigits ExponentPart {% join %}
  | DecimalIntegerLiteral "." ExponentPart {% join %}
  | "." DecimalDigits {% join %}
  | "." DecimalDigits ExponentPart {% join %}
  | DecimalIntegerLiteral {% join %}
  | DecimalIntegerLiteral ExponentPart {% join %}

DecimalIntegerLiteral ->
    "0"
  | NonZeroDigit {% id %}
  | NonZeroDigit DecimalDigits {% join %}

NonZeroDigit -> [1-9]

ExponentPart -> ExponentIndicator SignedInteger {% join %}

ExponentIndicator ->
    "e"
  | "E"

SignedInteger ->
    DecimalDigits {% id %}
  | "+" DecimalDigits {% join %}
  | "-" DecimalDigits {% join %}

NonDecimalIntegerLiteral ->
    BinaryIntegerLiteral {% id %}
  | OctalIntegerLiteral {% id %}
  | HexIntegerLiteral {% id %}

BinaryIntegerLiteral ->
    "0" "b" BinaryDigits {% join %}
  | "0" "B" BinaryDigits {% join %}

OctalIntegerLiteral ->
    "0" "o" OctalDigits {% join %}
  | "0" "O" OctalDigits {% join %}

HexIntegerLiteral ->
    "0" "x" HexDigits {% join %}
  | "0" "X" HexDigits {% join %}

DecimalDigits ->
    DecimalDigit {% id %}
  | DecimalDigits DecimalDigit {% join %}

BinaryDigits ->
    BinaryDigit {% id %}
  | BinaryDigits BinaryDigit {% join %}

OctalDigits ->
    OctalDigit {% id %}
  | OctalDigits OctalDigit {% join %}

HexDigits ->
    HexDigit {% id %}
  | HexDigits HexDigit {% join %}

DecimalDigit -> [0-9]

BinaryDigit -> [0-1]

OctalDigit -> [0-7]

HexDigit -> [0-9A-Fa-f]

_ ->
    null
  | " " _ {% () => null %}
