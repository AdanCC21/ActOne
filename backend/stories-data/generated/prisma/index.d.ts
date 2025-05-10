
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model StorieData
 * 
 */
export type StorieData = $Result.DefaultSelection<Prisma.$StorieDataPayload>
/**
 * Model ActData
 * 
 */
export type ActData = $Result.DefaultSelection<Prisma.$ActDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StorieData
 * const storieData = await prisma.storieData.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more StorieData
   * const storieData = await prisma.storieData.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.storieData`: Exposes CRUD operations for the **StorieData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StorieData
    * const storieData = await prisma.storieData.findMany()
    * ```
    */
  get storieData(): Prisma.StorieDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actData`: Exposes CRUD operations for the **ActData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActData
    * const actData = await prisma.actData.findMany()
    * ```
    */
  get actData(): Prisma.ActDataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    StorieData: 'StorieData',
    ActData: 'ActData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "storieData" | "actData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StorieData: {
        payload: Prisma.$StorieDataPayload<ExtArgs>
        fields: Prisma.StorieDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorieDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorieDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>
          }
          findFirst: {
            args: Prisma.StorieDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorieDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>
          }
          findMany: {
            args: Prisma.StorieDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>[]
          }
          create: {
            args: Prisma.StorieDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>
          }
          createMany: {
            args: Prisma.StorieDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorieDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>[]
          }
          delete: {
            args: Prisma.StorieDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>
          }
          update: {
            args: Prisma.StorieDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>
          }
          deleteMany: {
            args: Prisma.StorieDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorieDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StorieDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>[]
          }
          upsert: {
            args: Prisma.StorieDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorieDataPayload>
          }
          aggregate: {
            args: Prisma.StorieDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorieData>
          }
          groupBy: {
            args: Prisma.StorieDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorieDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorieDataCountArgs<ExtArgs>
            result: $Utils.Optional<StorieDataCountAggregateOutputType> | number
          }
        }
      }
      ActData: {
        payload: Prisma.$ActDataPayload<ExtArgs>
        fields: Prisma.ActDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>
          }
          findFirst: {
            args: Prisma.ActDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>
          }
          findMany: {
            args: Prisma.ActDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>[]
          }
          create: {
            args: Prisma.ActDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>
          }
          createMany: {
            args: Prisma.ActDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>[]
          }
          delete: {
            args: Prisma.ActDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>
          }
          update: {
            args: Prisma.ActDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>
          }
          deleteMany: {
            args: Prisma.ActDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>[]
          }
          upsert: {
            args: Prisma.ActDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActDataPayload>
          }
          aggregate: {
            args: Prisma.ActDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActData>
          }
          groupBy: {
            args: Prisma.ActDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActDataCountArgs<ExtArgs>
            result: $Utils.Optional<ActDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    storieData?: StorieDataOmit
    actData?: ActDataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model StorieData
   */

  export type AggregateStorieData = {
    _count: StorieDataCountAggregateOutputType | null
    _avg: StorieDataAvgAggregateOutputType | null
    _sum: StorieDataSumAggregateOutputType | null
    _min: StorieDataMinAggregateOutputType | null
    _max: StorieDataMaxAggregateOutputType | null
  }

  export type StorieDataAvgAggregateOutputType = {
    id: number | null
    author_id: number | null
    acts: number | null
    likes_count: number | null
    comments: number | null
    reports: number | null
  }

  export type StorieDataSumAggregateOutputType = {
    id: number | null
    author_id: number | null
    acts: number[]
    likes_count: number | null
    comments: number | null
    reports: number | null
  }

  export type StorieDataMinAggregateOutputType = {
    id: number | null
    author_id: number | null
    title: string | null
    likes_count: number | null
    comments: number | null
    reports: number | null
    visibility: boolean | null
    creation_date: Date | null
    mody_date: Date | null
  }

  export type StorieDataMaxAggregateOutputType = {
    id: number | null
    author_id: number | null
    title: string | null
    likes_count: number | null
    comments: number | null
    reports: number | null
    visibility: boolean | null
    creation_date: Date | null
    mody_date: Date | null
  }

  export type StorieDataCountAggregateOutputType = {
    id: number
    author_id: number
    title: number
    acts: number
    likes_count: number
    comments: number
    reports: number
    visibility: number
    creation_date: number
    mody_date: number
    _all: number
  }


  export type StorieDataAvgAggregateInputType = {
    id?: true
    author_id?: true
    acts?: true
    likes_count?: true
    comments?: true
    reports?: true
  }

  export type StorieDataSumAggregateInputType = {
    id?: true
    author_id?: true
    acts?: true
    likes_count?: true
    comments?: true
    reports?: true
  }

  export type StorieDataMinAggregateInputType = {
    id?: true
    author_id?: true
    title?: true
    likes_count?: true
    comments?: true
    reports?: true
    visibility?: true
    creation_date?: true
    mody_date?: true
  }

  export type StorieDataMaxAggregateInputType = {
    id?: true
    author_id?: true
    title?: true
    likes_count?: true
    comments?: true
    reports?: true
    visibility?: true
    creation_date?: true
    mody_date?: true
  }

  export type StorieDataCountAggregateInputType = {
    id?: true
    author_id?: true
    title?: true
    acts?: true
    likes_count?: true
    comments?: true
    reports?: true
    visibility?: true
    creation_date?: true
    mody_date?: true
    _all?: true
  }

  export type StorieDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorieData to aggregate.
     */
    where?: StorieDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorieData to fetch.
     */
    orderBy?: StorieDataOrderByWithRelationInput | StorieDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorieDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorieData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorieData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StorieData
    **/
    _count?: true | StorieDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StorieDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StorieDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorieDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorieDataMaxAggregateInputType
  }

  export type GetStorieDataAggregateType<T extends StorieDataAggregateArgs> = {
        [P in keyof T & keyof AggregateStorieData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorieData[P]>
      : GetScalarType<T[P], AggregateStorieData[P]>
  }




  export type StorieDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorieDataWhereInput
    orderBy?: StorieDataOrderByWithAggregationInput | StorieDataOrderByWithAggregationInput[]
    by: StorieDataScalarFieldEnum[] | StorieDataScalarFieldEnum
    having?: StorieDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorieDataCountAggregateInputType | true
    _avg?: StorieDataAvgAggregateInputType
    _sum?: StorieDataSumAggregateInputType
    _min?: StorieDataMinAggregateInputType
    _max?: StorieDataMaxAggregateInputType
  }

  export type StorieDataGroupByOutputType = {
    id: number
    author_id: number
    title: string
    acts: number[]
    likes_count: number
    comments: number
    reports: number
    visibility: boolean
    creation_date: Date
    mody_date: Date
    _count: StorieDataCountAggregateOutputType | null
    _avg: StorieDataAvgAggregateOutputType | null
    _sum: StorieDataSumAggregateOutputType | null
    _min: StorieDataMinAggregateOutputType | null
    _max: StorieDataMaxAggregateOutputType | null
  }

  type GetStorieDataGroupByPayload<T extends StorieDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorieDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorieDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorieDataGroupByOutputType[P]>
            : GetScalarType<T[P], StorieDataGroupByOutputType[P]>
        }
      >
    >


  export type StorieDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    title?: boolean
    acts?: boolean
    likes_count?: boolean
    comments?: boolean
    reports?: boolean
    visibility?: boolean
    creation_date?: boolean
    mody_date?: boolean
  }, ExtArgs["result"]["storieData"]>

  export type StorieDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    title?: boolean
    acts?: boolean
    likes_count?: boolean
    comments?: boolean
    reports?: boolean
    visibility?: boolean
    creation_date?: boolean
    mody_date?: boolean
  }, ExtArgs["result"]["storieData"]>

  export type StorieDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    title?: boolean
    acts?: boolean
    likes_count?: boolean
    comments?: boolean
    reports?: boolean
    visibility?: boolean
    creation_date?: boolean
    mody_date?: boolean
  }, ExtArgs["result"]["storieData"]>

  export type StorieDataSelectScalar = {
    id?: boolean
    author_id?: boolean
    title?: boolean
    acts?: boolean
    likes_count?: boolean
    comments?: boolean
    reports?: boolean
    visibility?: boolean
    creation_date?: boolean
    mody_date?: boolean
  }

  export type StorieDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "author_id" | "title" | "acts" | "likes_count" | "comments" | "reports" | "visibility" | "creation_date" | "mody_date", ExtArgs["result"]["storieData"]>

  export type $StorieDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StorieData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      author_id: number
      title: string
      acts: number[]
      likes_count: number
      comments: number
      reports: number
      visibility: boolean
      creation_date: Date
      mody_date: Date
    }, ExtArgs["result"]["storieData"]>
    composites: {}
  }

  type StorieDataGetPayload<S extends boolean | null | undefined | StorieDataDefaultArgs> = $Result.GetResult<Prisma.$StorieDataPayload, S>

  type StorieDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StorieDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StorieDataCountAggregateInputType | true
    }

  export interface StorieDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StorieData'], meta: { name: 'StorieData' } }
    /**
     * Find zero or one StorieData that matches the filter.
     * @param {StorieDataFindUniqueArgs} args - Arguments to find a StorieData
     * @example
     * // Get one StorieData
     * const storieData = await prisma.storieData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorieDataFindUniqueArgs>(args: SelectSubset<T, StorieDataFindUniqueArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StorieData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StorieDataFindUniqueOrThrowArgs} args - Arguments to find a StorieData
     * @example
     * // Get one StorieData
     * const storieData = await prisma.storieData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorieDataFindUniqueOrThrowArgs>(args: SelectSubset<T, StorieDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorieData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataFindFirstArgs} args - Arguments to find a StorieData
     * @example
     * // Get one StorieData
     * const storieData = await prisma.storieData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorieDataFindFirstArgs>(args?: SelectSubset<T, StorieDataFindFirstArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorieData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataFindFirstOrThrowArgs} args - Arguments to find a StorieData
     * @example
     * // Get one StorieData
     * const storieData = await prisma.storieData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorieDataFindFirstOrThrowArgs>(args?: SelectSubset<T, StorieDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StorieData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StorieData
     * const storieData = await prisma.storieData.findMany()
     * 
     * // Get first 10 StorieData
     * const storieData = await prisma.storieData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storieDataWithIdOnly = await prisma.storieData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorieDataFindManyArgs>(args?: SelectSubset<T, StorieDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StorieData.
     * @param {StorieDataCreateArgs} args - Arguments to create a StorieData.
     * @example
     * // Create one StorieData
     * const StorieData = await prisma.storieData.create({
     *   data: {
     *     // ... data to create a StorieData
     *   }
     * })
     * 
     */
    create<T extends StorieDataCreateArgs>(args: SelectSubset<T, StorieDataCreateArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StorieData.
     * @param {StorieDataCreateManyArgs} args - Arguments to create many StorieData.
     * @example
     * // Create many StorieData
     * const storieData = await prisma.storieData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorieDataCreateManyArgs>(args?: SelectSubset<T, StorieDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StorieData and returns the data saved in the database.
     * @param {StorieDataCreateManyAndReturnArgs} args - Arguments to create many StorieData.
     * @example
     * // Create many StorieData
     * const storieData = await prisma.storieData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StorieData and only return the `id`
     * const storieDataWithIdOnly = await prisma.storieData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorieDataCreateManyAndReturnArgs>(args?: SelectSubset<T, StorieDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StorieData.
     * @param {StorieDataDeleteArgs} args - Arguments to delete one StorieData.
     * @example
     * // Delete one StorieData
     * const StorieData = await prisma.storieData.delete({
     *   where: {
     *     // ... filter to delete one StorieData
     *   }
     * })
     * 
     */
    delete<T extends StorieDataDeleteArgs>(args: SelectSubset<T, StorieDataDeleteArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StorieData.
     * @param {StorieDataUpdateArgs} args - Arguments to update one StorieData.
     * @example
     * // Update one StorieData
     * const storieData = await prisma.storieData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorieDataUpdateArgs>(args: SelectSubset<T, StorieDataUpdateArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StorieData.
     * @param {StorieDataDeleteManyArgs} args - Arguments to filter StorieData to delete.
     * @example
     * // Delete a few StorieData
     * const { count } = await prisma.storieData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorieDataDeleteManyArgs>(args?: SelectSubset<T, StorieDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorieData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StorieData
     * const storieData = await prisma.storieData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorieDataUpdateManyArgs>(args: SelectSubset<T, StorieDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorieData and returns the data updated in the database.
     * @param {StorieDataUpdateManyAndReturnArgs} args - Arguments to update many StorieData.
     * @example
     * // Update many StorieData
     * const storieData = await prisma.storieData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StorieData and only return the `id`
     * const storieDataWithIdOnly = await prisma.storieData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StorieDataUpdateManyAndReturnArgs>(args: SelectSubset<T, StorieDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StorieData.
     * @param {StorieDataUpsertArgs} args - Arguments to update or create a StorieData.
     * @example
     * // Update or create a StorieData
     * const storieData = await prisma.storieData.upsert({
     *   create: {
     *     // ... data to create a StorieData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StorieData we want to update
     *   }
     * })
     */
    upsert<T extends StorieDataUpsertArgs>(args: SelectSubset<T, StorieDataUpsertArgs<ExtArgs>>): Prisma__StorieDataClient<$Result.GetResult<Prisma.$StorieDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StorieData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataCountArgs} args - Arguments to filter StorieData to count.
     * @example
     * // Count the number of StorieData
     * const count = await prisma.storieData.count({
     *   where: {
     *     // ... the filter for the StorieData we want to count
     *   }
     * })
    **/
    count<T extends StorieDataCountArgs>(
      args?: Subset<T, StorieDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorieDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StorieData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StorieDataAggregateArgs>(args: Subset<T, StorieDataAggregateArgs>): Prisma.PrismaPromise<GetStorieDataAggregateType<T>>

    /**
     * Group by StorieData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorieDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StorieDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorieDataGroupByArgs['orderBy'] }
        : { orderBy?: StorieDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StorieDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorieDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StorieData model
   */
  readonly fields: StorieDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StorieData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorieDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StorieData model
   */
  interface StorieDataFieldRefs {
    readonly id: FieldRef<"StorieData", 'Int'>
    readonly author_id: FieldRef<"StorieData", 'Int'>
    readonly title: FieldRef<"StorieData", 'String'>
    readonly acts: FieldRef<"StorieData", 'Int[]'>
    readonly likes_count: FieldRef<"StorieData", 'Int'>
    readonly comments: FieldRef<"StorieData", 'Int'>
    readonly reports: FieldRef<"StorieData", 'Int'>
    readonly visibility: FieldRef<"StorieData", 'Boolean'>
    readonly creation_date: FieldRef<"StorieData", 'DateTime'>
    readonly mody_date: FieldRef<"StorieData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StorieData findUnique
   */
  export type StorieDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * Filter, which StorieData to fetch.
     */
    where: StorieDataWhereUniqueInput
  }

  /**
   * StorieData findUniqueOrThrow
   */
  export type StorieDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * Filter, which StorieData to fetch.
     */
    where: StorieDataWhereUniqueInput
  }

  /**
   * StorieData findFirst
   */
  export type StorieDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * Filter, which StorieData to fetch.
     */
    where?: StorieDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorieData to fetch.
     */
    orderBy?: StorieDataOrderByWithRelationInput | StorieDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorieData.
     */
    cursor?: StorieDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorieData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorieData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorieData.
     */
    distinct?: StorieDataScalarFieldEnum | StorieDataScalarFieldEnum[]
  }

  /**
   * StorieData findFirstOrThrow
   */
  export type StorieDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * Filter, which StorieData to fetch.
     */
    where?: StorieDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorieData to fetch.
     */
    orderBy?: StorieDataOrderByWithRelationInput | StorieDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorieData.
     */
    cursor?: StorieDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorieData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorieData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorieData.
     */
    distinct?: StorieDataScalarFieldEnum | StorieDataScalarFieldEnum[]
  }

  /**
   * StorieData findMany
   */
  export type StorieDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * Filter, which StorieData to fetch.
     */
    where?: StorieDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorieData to fetch.
     */
    orderBy?: StorieDataOrderByWithRelationInput | StorieDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StorieData.
     */
    cursor?: StorieDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorieData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorieData.
     */
    skip?: number
    distinct?: StorieDataScalarFieldEnum | StorieDataScalarFieldEnum[]
  }

  /**
   * StorieData create
   */
  export type StorieDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * The data needed to create a StorieData.
     */
    data: XOR<StorieDataCreateInput, StorieDataUncheckedCreateInput>
  }

  /**
   * StorieData createMany
   */
  export type StorieDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StorieData.
     */
    data: StorieDataCreateManyInput | StorieDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StorieData createManyAndReturn
   */
  export type StorieDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * The data used to create many StorieData.
     */
    data: StorieDataCreateManyInput | StorieDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StorieData update
   */
  export type StorieDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * The data needed to update a StorieData.
     */
    data: XOR<StorieDataUpdateInput, StorieDataUncheckedUpdateInput>
    /**
     * Choose, which StorieData to update.
     */
    where: StorieDataWhereUniqueInput
  }

  /**
   * StorieData updateMany
   */
  export type StorieDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StorieData.
     */
    data: XOR<StorieDataUpdateManyMutationInput, StorieDataUncheckedUpdateManyInput>
    /**
     * Filter which StorieData to update
     */
    where?: StorieDataWhereInput
    /**
     * Limit how many StorieData to update.
     */
    limit?: number
  }

  /**
   * StorieData updateManyAndReturn
   */
  export type StorieDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * The data used to update StorieData.
     */
    data: XOR<StorieDataUpdateManyMutationInput, StorieDataUncheckedUpdateManyInput>
    /**
     * Filter which StorieData to update
     */
    where?: StorieDataWhereInput
    /**
     * Limit how many StorieData to update.
     */
    limit?: number
  }

  /**
   * StorieData upsert
   */
  export type StorieDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * The filter to search for the StorieData to update in case it exists.
     */
    where: StorieDataWhereUniqueInput
    /**
     * In case the StorieData found by the `where` argument doesn't exist, create a new StorieData with this data.
     */
    create: XOR<StorieDataCreateInput, StorieDataUncheckedCreateInput>
    /**
     * In case the StorieData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorieDataUpdateInput, StorieDataUncheckedUpdateInput>
  }

  /**
   * StorieData delete
   */
  export type StorieDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
    /**
     * Filter which StorieData to delete.
     */
    where: StorieDataWhereUniqueInput
  }

  /**
   * StorieData deleteMany
   */
  export type StorieDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorieData to delete
     */
    where?: StorieDataWhereInput
    /**
     * Limit how many StorieData to delete.
     */
    limit?: number
  }

  /**
   * StorieData without action
   */
  export type StorieDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorieData
     */
    select?: StorieDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorieData
     */
    omit?: StorieDataOmit<ExtArgs> | null
  }


  /**
   * Model ActData
   */

  export type AggregateActData = {
    _count: ActDataCountAggregateOutputType | null
    _avg: ActDataAvgAggregateOutputType | null
    _sum: ActDataSumAggregateOutputType | null
    _min: ActDataMinAggregateOutputType | null
    _max: ActDataMaxAggregateOutputType | null
  }

  export type ActDataAvgAggregateOutputType = {
    id: number | null
    story_id: number | null
  }

  export type ActDataSumAggregateOutputType = {
    id: number | null
    story_id: number | null
  }

  export type ActDataMinAggregateOutputType = {
    id: number | null
    story_id: number | null
    title: string | null
    content: string | null
  }

  export type ActDataMaxAggregateOutputType = {
    id: number | null
    story_id: number | null
    title: string | null
    content: string | null
  }

  export type ActDataCountAggregateOutputType = {
    id: number
    story_id: number
    title: number
    content: number
    _all: number
  }


  export type ActDataAvgAggregateInputType = {
    id?: true
    story_id?: true
  }

  export type ActDataSumAggregateInputType = {
    id?: true
    story_id?: true
  }

  export type ActDataMinAggregateInputType = {
    id?: true
    story_id?: true
    title?: true
    content?: true
  }

  export type ActDataMaxAggregateInputType = {
    id?: true
    story_id?: true
    title?: true
    content?: true
  }

  export type ActDataCountAggregateInputType = {
    id?: true
    story_id?: true
    title?: true
    content?: true
    _all?: true
  }

  export type ActDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActData to aggregate.
     */
    where?: ActDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActData to fetch.
     */
    orderBy?: ActDataOrderByWithRelationInput | ActDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActData
    **/
    _count?: true | ActDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActDataMaxAggregateInputType
  }

  export type GetActDataAggregateType<T extends ActDataAggregateArgs> = {
        [P in keyof T & keyof AggregateActData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActData[P]>
      : GetScalarType<T[P], AggregateActData[P]>
  }




  export type ActDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActDataWhereInput
    orderBy?: ActDataOrderByWithAggregationInput | ActDataOrderByWithAggregationInput[]
    by: ActDataScalarFieldEnum[] | ActDataScalarFieldEnum
    having?: ActDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActDataCountAggregateInputType | true
    _avg?: ActDataAvgAggregateInputType
    _sum?: ActDataSumAggregateInputType
    _min?: ActDataMinAggregateInputType
    _max?: ActDataMaxAggregateInputType
  }

  export type ActDataGroupByOutputType = {
    id: number
    story_id: number
    title: string
    content: string
    _count: ActDataCountAggregateOutputType | null
    _avg: ActDataAvgAggregateOutputType | null
    _sum: ActDataSumAggregateOutputType | null
    _min: ActDataMinAggregateOutputType | null
    _max: ActDataMaxAggregateOutputType | null
  }

  type GetActDataGroupByPayload<T extends ActDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActDataGroupByOutputType[P]>
            : GetScalarType<T[P], ActDataGroupByOutputType[P]>
        }
      >
    >


  export type ActDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    story_id?: boolean
    title?: boolean
    content?: boolean
  }, ExtArgs["result"]["actData"]>

  export type ActDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    story_id?: boolean
    title?: boolean
    content?: boolean
  }, ExtArgs["result"]["actData"]>

  export type ActDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    story_id?: boolean
    title?: boolean
    content?: boolean
  }, ExtArgs["result"]["actData"]>

  export type ActDataSelectScalar = {
    id?: boolean
    story_id?: boolean
    title?: boolean
    content?: boolean
  }

  export type ActDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "story_id" | "title" | "content", ExtArgs["result"]["actData"]>

  export type $ActDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      story_id: number
      title: string
      content: string
    }, ExtArgs["result"]["actData"]>
    composites: {}
  }

  type ActDataGetPayload<S extends boolean | null | undefined | ActDataDefaultArgs> = $Result.GetResult<Prisma.$ActDataPayload, S>

  type ActDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActDataCountAggregateInputType | true
    }

  export interface ActDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActData'], meta: { name: 'ActData' } }
    /**
     * Find zero or one ActData that matches the filter.
     * @param {ActDataFindUniqueArgs} args - Arguments to find a ActData
     * @example
     * // Get one ActData
     * const actData = await prisma.actData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActDataFindUniqueArgs>(args: SelectSubset<T, ActDataFindUniqueArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActDataFindUniqueOrThrowArgs} args - Arguments to find a ActData
     * @example
     * // Get one ActData
     * const actData = await prisma.actData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActDataFindUniqueOrThrowArgs>(args: SelectSubset<T, ActDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataFindFirstArgs} args - Arguments to find a ActData
     * @example
     * // Get one ActData
     * const actData = await prisma.actData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActDataFindFirstArgs>(args?: SelectSubset<T, ActDataFindFirstArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataFindFirstOrThrowArgs} args - Arguments to find a ActData
     * @example
     * // Get one ActData
     * const actData = await prisma.actData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActDataFindFirstOrThrowArgs>(args?: SelectSubset<T, ActDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActData
     * const actData = await prisma.actData.findMany()
     * 
     * // Get first 10 ActData
     * const actData = await prisma.actData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actDataWithIdOnly = await prisma.actData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActDataFindManyArgs>(args?: SelectSubset<T, ActDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActData.
     * @param {ActDataCreateArgs} args - Arguments to create a ActData.
     * @example
     * // Create one ActData
     * const ActData = await prisma.actData.create({
     *   data: {
     *     // ... data to create a ActData
     *   }
     * })
     * 
     */
    create<T extends ActDataCreateArgs>(args: SelectSubset<T, ActDataCreateArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActData.
     * @param {ActDataCreateManyArgs} args - Arguments to create many ActData.
     * @example
     * // Create many ActData
     * const actData = await prisma.actData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActDataCreateManyArgs>(args?: SelectSubset<T, ActDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActData and returns the data saved in the database.
     * @param {ActDataCreateManyAndReturnArgs} args - Arguments to create many ActData.
     * @example
     * // Create many ActData
     * const actData = await prisma.actData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActData and only return the `id`
     * const actDataWithIdOnly = await prisma.actData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActDataCreateManyAndReturnArgs>(args?: SelectSubset<T, ActDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActData.
     * @param {ActDataDeleteArgs} args - Arguments to delete one ActData.
     * @example
     * // Delete one ActData
     * const ActData = await prisma.actData.delete({
     *   where: {
     *     // ... filter to delete one ActData
     *   }
     * })
     * 
     */
    delete<T extends ActDataDeleteArgs>(args: SelectSubset<T, ActDataDeleteArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActData.
     * @param {ActDataUpdateArgs} args - Arguments to update one ActData.
     * @example
     * // Update one ActData
     * const actData = await prisma.actData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActDataUpdateArgs>(args: SelectSubset<T, ActDataUpdateArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActData.
     * @param {ActDataDeleteManyArgs} args - Arguments to filter ActData to delete.
     * @example
     * // Delete a few ActData
     * const { count } = await prisma.actData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActDataDeleteManyArgs>(args?: SelectSubset<T, ActDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActData
     * const actData = await prisma.actData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActDataUpdateManyArgs>(args: SelectSubset<T, ActDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActData and returns the data updated in the database.
     * @param {ActDataUpdateManyAndReturnArgs} args - Arguments to update many ActData.
     * @example
     * // Update many ActData
     * const actData = await prisma.actData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActData and only return the `id`
     * const actDataWithIdOnly = await prisma.actData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActDataUpdateManyAndReturnArgs>(args: SelectSubset<T, ActDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActData.
     * @param {ActDataUpsertArgs} args - Arguments to update or create a ActData.
     * @example
     * // Update or create a ActData
     * const actData = await prisma.actData.upsert({
     *   create: {
     *     // ... data to create a ActData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActData we want to update
     *   }
     * })
     */
    upsert<T extends ActDataUpsertArgs>(args: SelectSubset<T, ActDataUpsertArgs<ExtArgs>>): Prisma__ActDataClient<$Result.GetResult<Prisma.$ActDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataCountArgs} args - Arguments to filter ActData to count.
     * @example
     * // Count the number of ActData
     * const count = await prisma.actData.count({
     *   where: {
     *     // ... the filter for the ActData we want to count
     *   }
     * })
    **/
    count<T extends ActDataCountArgs>(
      args?: Subset<T, ActDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActDataAggregateArgs>(args: Subset<T, ActDataAggregateArgs>): Prisma.PrismaPromise<GetActDataAggregateType<T>>

    /**
     * Group by ActData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActDataGroupByArgs['orderBy'] }
        : { orderBy?: ActDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActData model
   */
  readonly fields: ActDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActData model
   */
  interface ActDataFieldRefs {
    readonly id: FieldRef<"ActData", 'Int'>
    readonly story_id: FieldRef<"ActData", 'Int'>
    readonly title: FieldRef<"ActData", 'String'>
    readonly content: FieldRef<"ActData", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActData findUnique
   */
  export type ActDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * Filter, which ActData to fetch.
     */
    where: ActDataWhereUniqueInput
  }

  /**
   * ActData findUniqueOrThrow
   */
  export type ActDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * Filter, which ActData to fetch.
     */
    where: ActDataWhereUniqueInput
  }

  /**
   * ActData findFirst
   */
  export type ActDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * Filter, which ActData to fetch.
     */
    where?: ActDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActData to fetch.
     */
    orderBy?: ActDataOrderByWithRelationInput | ActDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActData.
     */
    cursor?: ActDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActData.
     */
    distinct?: ActDataScalarFieldEnum | ActDataScalarFieldEnum[]
  }

  /**
   * ActData findFirstOrThrow
   */
  export type ActDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * Filter, which ActData to fetch.
     */
    where?: ActDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActData to fetch.
     */
    orderBy?: ActDataOrderByWithRelationInput | ActDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActData.
     */
    cursor?: ActDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActData.
     */
    distinct?: ActDataScalarFieldEnum | ActDataScalarFieldEnum[]
  }

  /**
   * ActData findMany
   */
  export type ActDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * Filter, which ActData to fetch.
     */
    where?: ActDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActData to fetch.
     */
    orderBy?: ActDataOrderByWithRelationInput | ActDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActData.
     */
    cursor?: ActDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActData.
     */
    skip?: number
    distinct?: ActDataScalarFieldEnum | ActDataScalarFieldEnum[]
  }

  /**
   * ActData create
   */
  export type ActDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * The data needed to create a ActData.
     */
    data: XOR<ActDataCreateInput, ActDataUncheckedCreateInput>
  }

  /**
   * ActData createMany
   */
  export type ActDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActData.
     */
    data: ActDataCreateManyInput | ActDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActData createManyAndReturn
   */
  export type ActDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * The data used to create many ActData.
     */
    data: ActDataCreateManyInput | ActDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActData update
   */
  export type ActDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * The data needed to update a ActData.
     */
    data: XOR<ActDataUpdateInput, ActDataUncheckedUpdateInput>
    /**
     * Choose, which ActData to update.
     */
    where: ActDataWhereUniqueInput
  }

  /**
   * ActData updateMany
   */
  export type ActDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActData.
     */
    data: XOR<ActDataUpdateManyMutationInput, ActDataUncheckedUpdateManyInput>
    /**
     * Filter which ActData to update
     */
    where?: ActDataWhereInput
    /**
     * Limit how many ActData to update.
     */
    limit?: number
  }

  /**
   * ActData updateManyAndReturn
   */
  export type ActDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * The data used to update ActData.
     */
    data: XOR<ActDataUpdateManyMutationInput, ActDataUncheckedUpdateManyInput>
    /**
     * Filter which ActData to update
     */
    where?: ActDataWhereInput
    /**
     * Limit how many ActData to update.
     */
    limit?: number
  }

  /**
   * ActData upsert
   */
  export type ActDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * The filter to search for the ActData to update in case it exists.
     */
    where: ActDataWhereUniqueInput
    /**
     * In case the ActData found by the `where` argument doesn't exist, create a new ActData with this data.
     */
    create: XOR<ActDataCreateInput, ActDataUncheckedCreateInput>
    /**
     * In case the ActData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActDataUpdateInput, ActDataUncheckedUpdateInput>
  }

  /**
   * ActData delete
   */
  export type ActDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
    /**
     * Filter which ActData to delete.
     */
    where: ActDataWhereUniqueInput
  }

  /**
   * ActData deleteMany
   */
  export type ActDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActData to delete
     */
    where?: ActDataWhereInput
    /**
     * Limit how many ActData to delete.
     */
    limit?: number
  }

  /**
   * ActData without action
   */
  export type ActDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActData
     */
    select?: ActDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActData
     */
    omit?: ActDataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StorieDataScalarFieldEnum: {
    id: 'id',
    author_id: 'author_id',
    title: 'title',
    acts: 'acts',
    likes_count: 'likes_count',
    comments: 'comments',
    reports: 'reports',
    visibility: 'visibility',
    creation_date: 'creation_date',
    mody_date: 'mody_date'
  };

  export type StorieDataScalarFieldEnum = (typeof StorieDataScalarFieldEnum)[keyof typeof StorieDataScalarFieldEnum]


  export const ActDataScalarFieldEnum: {
    id: 'id',
    story_id: 'story_id',
    title: 'title',
    content: 'content'
  };

  export type ActDataScalarFieldEnum = (typeof ActDataScalarFieldEnum)[keyof typeof ActDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type StorieDataWhereInput = {
    AND?: StorieDataWhereInput | StorieDataWhereInput[]
    OR?: StorieDataWhereInput[]
    NOT?: StorieDataWhereInput | StorieDataWhereInput[]
    id?: IntFilter<"StorieData"> | number
    author_id?: IntFilter<"StorieData"> | number
    title?: StringFilter<"StorieData"> | string
    acts?: IntNullableListFilter<"StorieData">
    likes_count?: IntFilter<"StorieData"> | number
    comments?: IntFilter<"StorieData"> | number
    reports?: IntFilter<"StorieData"> | number
    visibility?: BoolFilter<"StorieData"> | boolean
    creation_date?: DateTimeFilter<"StorieData"> | Date | string
    mody_date?: DateTimeFilter<"StorieData"> | Date | string
  }

  export type StorieDataOrderByWithRelationInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    acts?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
    visibility?: SortOrder
    creation_date?: SortOrder
    mody_date?: SortOrder
  }

  export type StorieDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StorieDataWhereInput | StorieDataWhereInput[]
    OR?: StorieDataWhereInput[]
    NOT?: StorieDataWhereInput | StorieDataWhereInput[]
    author_id?: IntFilter<"StorieData"> | number
    title?: StringFilter<"StorieData"> | string
    acts?: IntNullableListFilter<"StorieData">
    likes_count?: IntFilter<"StorieData"> | number
    comments?: IntFilter<"StorieData"> | number
    reports?: IntFilter<"StorieData"> | number
    visibility?: BoolFilter<"StorieData"> | boolean
    creation_date?: DateTimeFilter<"StorieData"> | Date | string
    mody_date?: DateTimeFilter<"StorieData"> | Date | string
  }, "id">

  export type StorieDataOrderByWithAggregationInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    acts?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
    visibility?: SortOrder
    creation_date?: SortOrder
    mody_date?: SortOrder
    _count?: StorieDataCountOrderByAggregateInput
    _avg?: StorieDataAvgOrderByAggregateInput
    _max?: StorieDataMaxOrderByAggregateInput
    _min?: StorieDataMinOrderByAggregateInput
    _sum?: StorieDataSumOrderByAggregateInput
  }

  export type StorieDataScalarWhereWithAggregatesInput = {
    AND?: StorieDataScalarWhereWithAggregatesInput | StorieDataScalarWhereWithAggregatesInput[]
    OR?: StorieDataScalarWhereWithAggregatesInput[]
    NOT?: StorieDataScalarWhereWithAggregatesInput | StorieDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StorieData"> | number
    author_id?: IntWithAggregatesFilter<"StorieData"> | number
    title?: StringWithAggregatesFilter<"StorieData"> | string
    acts?: IntNullableListFilter<"StorieData">
    likes_count?: IntWithAggregatesFilter<"StorieData"> | number
    comments?: IntWithAggregatesFilter<"StorieData"> | number
    reports?: IntWithAggregatesFilter<"StorieData"> | number
    visibility?: BoolWithAggregatesFilter<"StorieData"> | boolean
    creation_date?: DateTimeWithAggregatesFilter<"StorieData"> | Date | string
    mody_date?: DateTimeWithAggregatesFilter<"StorieData"> | Date | string
  }

  export type ActDataWhereInput = {
    AND?: ActDataWhereInput | ActDataWhereInput[]
    OR?: ActDataWhereInput[]
    NOT?: ActDataWhereInput | ActDataWhereInput[]
    id?: IntFilter<"ActData"> | number
    story_id?: IntFilter<"ActData"> | number
    title?: StringFilter<"ActData"> | string
    content?: StringFilter<"ActData"> | string
  }

  export type ActDataOrderByWithRelationInput = {
    id?: SortOrder
    story_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
  }

  export type ActDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActDataWhereInput | ActDataWhereInput[]
    OR?: ActDataWhereInput[]
    NOT?: ActDataWhereInput | ActDataWhereInput[]
    story_id?: IntFilter<"ActData"> | number
    title?: StringFilter<"ActData"> | string
    content?: StringFilter<"ActData"> | string
  }, "id">

  export type ActDataOrderByWithAggregationInput = {
    id?: SortOrder
    story_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    _count?: ActDataCountOrderByAggregateInput
    _avg?: ActDataAvgOrderByAggregateInput
    _max?: ActDataMaxOrderByAggregateInput
    _min?: ActDataMinOrderByAggregateInput
    _sum?: ActDataSumOrderByAggregateInput
  }

  export type ActDataScalarWhereWithAggregatesInput = {
    AND?: ActDataScalarWhereWithAggregatesInput | ActDataScalarWhereWithAggregatesInput[]
    OR?: ActDataScalarWhereWithAggregatesInput[]
    NOT?: ActDataScalarWhereWithAggregatesInput | ActDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ActData"> | number
    story_id?: IntWithAggregatesFilter<"ActData"> | number
    title?: StringWithAggregatesFilter<"ActData"> | string
    content?: StringWithAggregatesFilter<"ActData"> | string
  }

  export type StorieDataCreateInput = {
    author_id: number
    title: string
    acts?: StorieDataCreateactsInput | number[]
    likes_count?: number
    comments?: number
    reports?: number
    visibility?: boolean
    creation_date?: Date | string
    mody_date?: Date | string
  }

  export type StorieDataUncheckedCreateInput = {
    id?: number
    author_id: number
    title: string
    acts?: StorieDataCreateactsInput | number[]
    likes_count?: number
    comments?: number
    reports?: number
    visibility?: boolean
    creation_date?: Date | string
    mody_date?: Date | string
  }

  export type StorieDataUpdateInput = {
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    acts?: StorieDataUpdateactsInput | number[]
    likes_count?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    visibility?: BoolFieldUpdateOperationsInput | boolean
    creation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    mody_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorieDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    acts?: StorieDataUpdateactsInput | number[]
    likes_count?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    visibility?: BoolFieldUpdateOperationsInput | boolean
    creation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    mody_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorieDataCreateManyInput = {
    id?: number
    author_id: number
    title: string
    acts?: StorieDataCreateactsInput | number[]
    likes_count?: number
    comments?: number
    reports?: number
    visibility?: boolean
    creation_date?: Date | string
    mody_date?: Date | string
  }

  export type StorieDataUpdateManyMutationInput = {
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    acts?: StorieDataUpdateactsInput | number[]
    likes_count?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    visibility?: BoolFieldUpdateOperationsInput | boolean
    creation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    mody_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorieDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    acts?: StorieDataUpdateactsInput | number[]
    likes_count?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    visibility?: BoolFieldUpdateOperationsInput | boolean
    creation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    mody_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActDataCreateInput = {
    story_id: number
    title: string
    content: string
  }

  export type ActDataUncheckedCreateInput = {
    id?: number
    story_id: number
    title: string
    content: string
  }

  export type ActDataUpdateInput = {
    story_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ActDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ActDataCreateManyInput = {
    id?: number
    story_id: number
    title: string
    content: string
  }

  export type ActDataUpdateManyMutationInput = {
    story_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ActDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StorieDataCountOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    acts?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
    visibility?: SortOrder
    creation_date?: SortOrder
    mody_date?: SortOrder
  }

  export type StorieDataAvgOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    acts?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
  }

  export type StorieDataMaxOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
    visibility?: SortOrder
    creation_date?: SortOrder
    mody_date?: SortOrder
  }

  export type StorieDataMinOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
    visibility?: SortOrder
    creation_date?: SortOrder
    mody_date?: SortOrder
  }

  export type StorieDataSumOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    acts?: SortOrder
    likes_count?: SortOrder
    comments?: SortOrder
    reports?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ActDataCountOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
  }

  export type ActDataAvgOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
  }

  export type ActDataMaxOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
  }

  export type ActDataMinOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
  }

  export type ActDataSumOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
  }

  export type StorieDataCreateactsInput = {
    set: number[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type StorieDataUpdateactsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}