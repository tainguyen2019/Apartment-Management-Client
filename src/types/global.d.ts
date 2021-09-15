type ExcludeChildren<T> = Omit<T, 'children'>;

type OmitFrom<T, TKeys extends keyof T> = Omit<T, TKeys>;

type PickFrom<T, TKeys extends keyof T> = Pick<T, TKeys>;

type OptionalFrom<T, TKeys extends keyof T> = OmitFrom<T, TKeys> &
  {
    [K in TKeys]?: T[K];
  };

type ValueOf<T> = T[keyof T];

type Nullable<TValue> = TValue | undefined | null | false;

type TypedFunction<TArgs extends any[] = [], TReturn = void> = (
  ...args: TArgs
) => TReturn;

type ReturnedFunction<TReturn = void> = TypedFunction<[], TReturn>;

type GeneralFunction = TypedFunction<any[], any>;

type Builder<TState extends {}> = (overrides?: Partial<TState>) => TState;
