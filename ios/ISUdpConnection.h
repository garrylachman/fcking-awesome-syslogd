//
//  ISUdpConnection.h
//  iSyslogd
//
//  Created by Curtis Jones on 2013.12.19.
//  Copyright (c) 2013 Curtis Jones. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifdef __OBJC__
  #import <Cocoa/Cocoa.h>
  #import <React/RCTLog.h>
  #define DLog(fmt, ...) RCTLogInfo((@"%s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#endif

typedef void (^ISUdpConnectionLogLineHandler) (NSString *addr, NSNumber *port, NSString *logline);

@interface ISUdpConnection : NSObject

- (id)initWithPort:(int)bindPort;
- (void)close;

@property (readwrite, strong, nonatomic) ISUdpConnectionLogLineHandler logLineHandler;

@end
