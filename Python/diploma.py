from sympy import *
import re

def changeX(string):
  # данная ф-я служит только для того, чтобы
  # заменить все иксы для дальнейшего использования
  # за счет того, что параллельное соедин элементов
  # дает нам право x=x1=x2=...xn

  e = string.split("x") 
  x = "x"
  for el in e:
    if(el[0] == "_"):
      
      x += el.split("(t)")[0]
      break
  return re.sub(r'x_\d+', x, string)
def parallelStress(elements):
  # параллельное соединение элементов

  # идея точно такая же как и в функции splitArr, но только если достигаем одномерного массива
  # например [e,v,e] -> то вместо этого массива сюда перепишутся s=e+v+e 
  if(type(elements) != str):
    for i in range(len(elements)):
      if(type(elements[i]) != str):
        if (len(elements[i]) >= 1):
          if(len(elements[i]) == 1 and type(elements[i][0]) == str):
            pass
          else:
            # достигли того самого массива, который нам нужен
            # и тогда начинаем вычисление sigma параллельно соед элементов
            summ = ""
            for el in elements[i]:
              
              if(type(el) != str):
                # данное условие нужно, если так случилось, что массив выглядит след образом
                # [e,v, [[e],[v]]]
                # и тогда пока откладываем вычисление напряжения, так как приоритетнее вычисление последовательно соед элементов
                summ = ""
                break
              summ += "{el}+".format(el=el.split("=")[1])

            if(summ != ""):
              elements[i] = "{el}=".format(el=el.split("=")[0])+summ[:-1]
              elements[i] = changeX(elements[i]) # замена всех иксов на один и тот же, чтобы индексы были равны
            parallelStress(elements[i]) # ну и вызываем рекурсию, чтобы дальше искал другие вложенные, паралелльно соедиенные, элементы
    return elements
def splitArr(arr, depth="0"):
  for i in range(len(arr)):
    if(type(arr[i]) == list):
      # если так получилось, что элемент массива arr[i] является также массивом, 
      # то глубина увеличивается и для него же arr[i] перезапускаем данную функцию, устраивая рекурсию 
      depth += str(i)
      splitArr(arr[i], depth)
    elif (type(arr[i]) == str):
      # рано или поздно дойдем до самих элементов, то мы будем заполнять их сразу определяющими соотношениями
      if(arr[i] == "e"):
        arr[i] = "sigma_{depth}(t)=E_{depth}_{i}*x_{depth}(t)".format(depth=depth,i=i)
      elif(arr[i] == "v"):
        arr[i] = "sigma_{depth}(t)=eta_{depth}_{i}*diff(x_{depth}(t),t)".format(depth=depth,i=i)
      elif(arr[i] == "T"):
        arr[i] = "sigma_{depth}(t)=T_{depth}_{i}".format(depth=depth,i=i)
  return arr
def serialStress(elements:list, src):
  xvar = ""
  isOk = False # показатель того, что достигли идеального массива для вычисления послед соед элементов
  # тут такая же идея с рекурсией, вот только не придумал еще способ, как можно оптимизировать код

  for el in elements:
    
    if(type(el) == list and len(el) == 1):
      isOk = True
      # эмпирическим путем заметили, что данное условие будет верным
      # во первых,  изначально назначили правилу соединения элементов
      # во вторых после вычисления парал-х элементов, получается у нас один элемент, который будет просто строкой
      # то есть [[e], [e+v]]
      s2 = el[0].split("=")[1] # берется правая часть определяющ соотношения, так как левая часть это просто напряжение
      # а так же, пока будем полагать, что у нас в левой части будет только sigma
      # а в правой части функция f(x,dx/dt,t)
      if("+" in s2):
        
        s2 = s2.split("+")[0].split("*")[1] # получаем деформации из ОС (опр-е соотношение), если вдруг здесь сумма элементов(т.е параллельно)
      elif("*" in s2):
        s2 = s2.split("*")[1] # если вдруг там только один элемент, то есть s=E*x -> то получаем x
      print("s2",s2)
      if("diff" in s2):
        s2 = s2.split("diff(")[1].split(",")[0] # если вдруг там только один элемент, а также есть производная s=n*dx/dt, то получаем x
      xvar += s2 + "+" # ну и устанавливаем правило, что x=x1+x2+...+xn
    else:
      if(type(el) == list):
        # все плохие случаи и нужно еще углублиться в массив и на них перезапускаем функцию
        serialStress(el, src)

  # наконец достигли и нашли идеальный массив, то начинаем собственно работу
  if(isOk):
    changeEl = elements
    allx = xvar[:-1].split("+") # массив состоящий только из иксов [x1,x2,x3...]
    print("allx",allx)
    temp = allx[0]
    # то что ниже закомментировано, пока не знаю, зачем это делал, но кажется это нахождение x с минимальным индексом глубины

    # for i in range(len(allx)-1):
    #   if(len(allx[i]) > len(allx[i+1])):
    #     temp = allx[i+1]
    #   else:
    #     temp = allx[i]
    firststr = xvar[:-1].split("+")[0] # получили первый икс
    for el in range(len(elements)-1):
      if(len(elements[el][0].split("=")[0]) > len(elements[el+1][0].split("=")[0])):
        temp1 = elements[el+1][0].split("=")[0]
      else:
        temp1 = elements[el][0].split("=")[0]
    temp1 = temp1.split("(")[0][:-1]
    for el in elements:
      el[0] = el[0].replace(el[0].split("=")[0], temp1+"(t)")
    print("Рассмотрим ",elements) # собственно рассматриваем подсистему элементов, которую будем решать
    old = elements
    xvar = Eq(parse_expr(temp.split("(")[0][:-1] + "(t)"), parse_expr(xvar[:-1]))
    xvar # уравнение иксов x=x1+x2+x3...
    first = solve(xvar, parse_expr(firststr))[0] # выразили для x1 из x=x1+x2+...
    print( "xvar",xvar)
    aaa = str(elements[0]).replace(firststr, "({expr})".format(expr = str(first))) # заменили первый x1 в первом уравнении на x-x2-x3...
    print("aa",aaa)
    print("debug", allx)
    for xs in range(1, len(allx)):
      try:
        # если вдруг тут у нас диффур, то решаем диффур относительно x2 x3 x4...
        # print(classify_ode(Eq(parse_expr(elements[xs][0].split("=")[0]), parse_expr(elements[xs][0].split("=")[1]))))
        # print(classify_ode(Eq(parse_expr(elements[xs][0].split("=")[0]), parse_expr(elements[xs][0].split("=")[1])), parse_expr(allx[xs]))[0])
        qq = dsolve(Eq(parse_expr(elements[xs][0].split("=")[0]), parse_expr(elements[xs][0].split("=")[1])), parse_expr(allx[xs]), hint="Bernoulli")

        xx = qq.rhs
        
      except ValueError:
        # иначе просто решаем уравнение относительно x2 x3 x4...
        eq = Eq(parse_expr(elements[xs][0].split("=")[0]),parse_expr(elements[xs][0].split("=")[1]))
        xx = solve(eq, parse_expr(allx[xs]))[0]
      # полученное решение подставляем в первое уравнение
      aaa = aaa.replace(allx[xs], "({xx})".format(xx = str(xx)))
      print(aaa)
      print("Here")
      # print(allx[xs], str(xx))
    elements = aaa
    print("/////////////")
    print(elements) # Итого получили новое опред соотношение

    #######
    if("Integral" in aaa):
      eq = Eq(sympify(aaa[2:-2].split("=")[0]), sympify(aaa[2:-2].split("=")[1]))
      integ = "Integral" + elements.split("Integral")[1].split(", t)")[0] + ", t)"
      print("Integral is ", integ)
      integrand = solve(eq, sympify(integ))[0]
      print(integrand)
      deq = Eq(diff(eq.lhs, "t"), diff(eq.rhs, "t"))
      print("Diff-ed")
      # pprint(deq)
      res = Eq(deq.lhs, simplify(parse_expr(str(deq.rhs).replace(integ, "("+str(integrand)+")"))))
      
      print("Final_res")
      # result = Eq(eq.lhs, simplify(dsolve(res, eq.lhs, hint="Bernoulli")))
      final_result = simplify(dsolve(res, eq.lhs, hint="Bernoulli"))
      pprint(final_result)
      print(final_result)
    # integrand = solve(eq, "Integral(sigma_00(t)*exp(E_0001001_0*t/(eta_0001001_1 + eta_000100_1))*exp(E_000100_0*t/(eta_0001001_1 + eta_000100_1)), t)")[0]
    # print(classify_ode(result, parse_expr("sigma_00(t)")))
    #######
    # diffeq = Eq(parse_expr(aaa[2:-2].split("=")[0], parse_expr(aaa[2:-2].split("=")[1])))
    # if("Integral" in aaa):
    #   diffeq = Eq(diff(parse_expr(aaa[2:-2].split("=")[0]), "t"), diff(parse_expr(aaa[2:-2].split("=")[1]),"t"))
    #   aaa = str(dsolve(diffeq, parse_expr(aaa[2:-2].split("=")[0]), hint="almost_linear"))
    
      print("/////////////")
      
      print([replace_subarray(src, old, [str(final_result.lhs) + "=" + str(final_result.rhs)])])
      with open("res.config", "w") as file:
        file.write(str([replace_subarray(src, old, [str(final_result.lhs) + "=" + str(final_result.rhs)])]))
    else:
      eq = Eq(parse_expr(aaa[2:-2].split("=")[0]), parse_expr(aaa[2:-2].split("=")[1]))
      res = solve(eq, parse_expr(aaa[2:-2].split("=")[0]))[0]
      final_result = aaa[2:-2].split("=")[0] + "=" + str(res)
      with open("res.conf", "w") as file:
        file.write(str([[final_result]]))
    return 0
    
def replace_subarray(arr, old_subarr, new_subarr):
    for i, subarr in enumerate(arr):
        if subarr == old_subarr:
            arr[i] = new_subarr[0]
        elif isinstance(subarr, list):
            replace_subarray(subarr, old_subarr, new_subarr)
    return arr