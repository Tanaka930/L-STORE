import random
import datetime


sql_text1 = "INSERT INTO follow_records(user_id,follow,unfollow,created_at,updated_at) VALUES (1,"
sql_text2 = ");"
lange = 49
now = datetime.datetime.now()
for num in range(49):
  
  day = now + datetime.timedelta(days=-(lange))
  
  lange = lange-1

  sql = sql_text1 + "'" + str(random.randrange(100)) + "','" + str(random.randrange(100)) + "','" + str(day) + "','" + str(day) + "'" + sql_text2

  print(sql)