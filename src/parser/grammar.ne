@preprocessor typescript

@{%
export interface BinaryExpression {
  type: 'BinaryExpression';
  operator: '+' | '-' | '*' | '/' | '%' | '**';
  left: Expression;
  right: Expression;
}

export interface UnaryExpression {
  type: 'UnaryExpression';
  operator: '+' | '-';
  argument: Expression;
}

export interface CallExpression {
  type: 'CallExpression';
  callee: Identifier;
  arguments: Expression[];
}

export interface Identifier {
  type: 'Identifier';
  name: string;
}

export interface Literal {
  type: 'Literal';
  value: number;
}

export type Expression = BinaryExpression | UnaryExpression | CallExpression | Identifier | Literal;

const unwrap = (d: any[]): Expression => d[1];
const binary = (d: any[]): BinaryExpression => ({ type: 'BinaryExpression', operator: d[2], left: d[0], right: d[4] });
const unary = (d: any[]): UnaryExpression => ({ type: 'UnaryExpression', operator: d[0], argument: d[2] });
const call = (d: any[]): CallExpression => ({ type: 'CallExpression', callee: d[0], arguments: d[2] });
const identifier = (d: any[]): Identifier => ({ type: 'Identifier', name: d[0] });
const literal = (d: any[]): Literal => ({ type: 'Literal', value: Number(d[0]) });
const fold = (d: any[]): Expression[] => d[0].concat(d[2]);
const empty = (): Expression[] => [];
const join = (d: any[]): string => d.join('');
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
  | LeftHandSideExpression _ "**" _ ExponentiationExpression {% binary %}

UnaryExpression ->
    LeftHandSideExpression {% id %}
  | "+" _ UnaryExpression {% unary %}
  | "-" _ UnaryExpression {% unary %}

LeftHandSideExpression -> 
    PrimaryExpression {% id %}
  | CallExpression {% id %}

CallExpression -> Identifier _ Arguments {% call %}

Arguments ->
    "(" _ ")" {% empty %}
  | "(" ArgumentList ")" {% unwrap %}

ArgumentList ->
    Expression
  | ArgumentList "," Expression {% fold %}

PrimaryExpression ->
    Identifier {% id %}
  | Literal {% id %}
  | ParenthesizedExpression {% id %}

ParenthesizedExpression -> "(" Expression ")" {% unwrap %}

Identifier -> IdentifierName {% identifier %}

IdentifierName ->
    IdentifierStart {% join %}
  | IdentifierName IdentifierPart {% join %}

IdentifierStart -> [$A-Z_a-z]

IdentifierPart -> [$0-9A-Z_a-z]

Literal -> NumericLiteral {% literal %}

NumericLiteral ->
    DecimalLiteral {% id %}
  | NonDecimalIntegerLiteral {% id %}

DecimalLiteral ->
    DecimalIntegerLiteral "." DecimalDigits:? ExponentPart:? {% join %}
  | "." DecimalDigits ExponentPart:? {% join %}
  | DecimalIntegerLiteral ExponentPart:? {% join %}

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
    "0b" BinaryDigits {% join %}
  | "0B" BinaryDigits {% join %}

OctalIntegerLiteral ->
    "0o" OctalDigits {% join %}
  | "0O" OctalDigits {% join %}

HexIntegerLiteral ->
    "0x" HexDigits {% join %}
  | "0X" HexDigits {% join %}

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
